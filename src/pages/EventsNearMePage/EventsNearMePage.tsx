import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "../../components/UI/Footer/Footer";
import Navbar from "../../components/UI/Navbar/Navbar";
import "./EventsNearMePage.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
// import { events } from "../../dummyData";
import useApi from "../../hooks/apiHook";
interface ILocationCoords {
  location?: string;
  lat: number;
  lng: number;
}
interface INearbyEvent {
  title: string;
  location: string;
  distance: string;
}
const EventsNearMePage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [venues, setVenues] = useState<any[]>([]);
  const [locationCoords, setLocationCoords] = useState<ILocationCoords>({
    location: "",
    lat: 0,
    lng: 0,
  });
  const [nearbyCoords, setNearbyCoords] = useState<ILocationCoords[]>([]);
  const [nearbyEvents, setNearbyEvents] = useState<INearbyEvent[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const { addressSearch, getAllEvents, getAllVenues } = useApi();

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY as string;
  const map = useRef<any>();
  const mapElement = useRef<any>();
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position: any) => {
    setLocationCoords({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  const center = useMemo(() => {
    return { lat: locationCoords.lat, lng: locationCoords.lng };
  }, [locationCoords]);
  console.log(center);
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in meters
    return distance;
  };
  useEffect(() => {
    getAllVenues().then((res) => {
      setVenues(res);
    });
    getAllEvents().then((res) => {
      setEvents(res);
    });
    console.log("events", events, "venues", venues);

    events.map((event) => {
      setLocations((prev) => [
        ...prev,
        `${venues.find((venue) => venue.id === event.venueId).street}, ${
          venues.find((venue) => venue.id === event.venueId).city
        }, ${venues.find((venue) => venue.id === event.venueId).state}`,
      ]);
    });
    console.log(locations);

    getLocation();
  }, [locationCoords.lat]);
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapElement.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [center.lng, center.lat],
      zoom: 2,
    });
    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    );
  }, [center]);
  useEffect(() => {
    if (locations.length > 0) {
      locations.map((location) => {
        addressSearch(location).then((res) => {
          console.log(res);

          setNearbyCoords((prev) => [
            ...prev,
            {
              location: location,
              lat: res[0].center[1],
              lng: res[0].center[0],
            },
          ]);
        });
      });
    }
  }, [locations]);

  useEffect(() => {
    let radius = 6000;
    const uniqueNearbyEvents = new Set(); // Create a Set to store unique event titles

    nearbyCoords.forEach((coord) => {
      events.forEach((event) => {
        const venue = venues.find((venue) => venue.id === event.venueId);
        const eventLocation = `${venue.street}, ${venue.city}, ${venue.state}`;
        // if any of the venue.street, venue.city, venue.state is undefined, skip this iteration
        if (!venue.street || !venue.city || !venue.state) return;
        const distance = calculateDistance(
          coord.lat,
          coord.lng,
          center.lat,
          center.lng,
        );

        if (eventLocation === coord.location && distance < radius) {
          const eventDetails = {
            title: event.name,
            location: eventLocation,
            distance: `${(distance / 1000).toFixed(2)}km`,
          };
          uniqueNearbyEvents.add(JSON.stringify(eventDetails)); // Add stringified event details to Set
        }
      });
    });

    const newNearbyEvents = Array.from(uniqueNearbyEvents).map(
      (eventString: any) => JSON.parse(eventString),
    );

    setNearbyEvents(newNearbyEvents);
  }, [nearbyCoords, center, events, venues]);

  useEffect(() => {
    if (!map.current) return;
    const marker = new mapboxgl.Marker({
      color: "blue",
    })
      .setLngLat([center.lng, center.lat])
      .addTo(map.current);

    map.current.flyTo({
      center: [center.lng, center.lat],
      zoom: 14,
    });
    nearbyCoords
      .filter((coord) => {
        let radius = 50;
        let distance = Math.sqrt(
          Math.pow(coord.lat - center.lat, 2) +
            Math.pow(coord.lng - center.lng, 2),
        );
        return distance < radius;
      })
      .map((coord) => {
        let markerElement = document.createElement("div");
        markerElement.className = "marker";
        return new mapboxgl.Marker(markerElement)
          .setLngLat([coord.lng, coord.lat])
          .addTo(map.current);
      });
    return () => {
      marker.remove();
    };
  }, [locationCoords]);

  console.log(nearbyEvents);

  return (
    <>
      <Navbar />
      <div className="events-near-me-page-container">
        <h1>Events Near Me</h1>
        <div className="main-events-nearby-container-container">
          <div className="nearby-events-sidebar">
            {nearbyEvents.map((event) => {
              return (
                <div className="nearby-event" key={event.title}>
                  <h2>{event.title}</h2>
                  <p>{event.location}</p>
                  <p>{event.distance}</p>
                </div>
              );
            })}
          </div>
          <div className="map-container" ref={mapElement} />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default EventsNearMePage;
