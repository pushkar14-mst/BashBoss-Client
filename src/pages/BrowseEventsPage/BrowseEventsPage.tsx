import { useDispatch, useSelector } from "react-redux";
import EventGridCard from "../../components/UI/EventGridCard/EventGridCard";
import FilterBox from "../../components/UI/FilterBox/FilterBox";
import Navbar from "../../components/UI/Navbar/Navbar";
import "./BrowseEventsPage.css";
import { useEffect, useState } from "react";
import Footer from "../../components/UI/Footer/Footer";
import useApi from "../../hooks/apiHook";
import { IVenue } from "../../IVenue";
import LoadingModal from "../../components/UI/Modal/LoadingModal";
import { loadingActions } from "../../store/loading-store";

// import { events } from "../../dummyData";
// let events = [
//   {
//     title: "IU Hoosiers vs Northwestern Wildcats",
//     date: "2024-02-18",
//     venue: "Assembly Hall",
//     time: "3:00 PM",
//     category: "Sports",
//     image:
//       "https://cdn.vox-cdn.com/thumbor/5d-NuwLaj1O8-Cqn203pYpbvO3M=/0x0:4096x2730/1200x800/filters:focal(1721x1038:2375x1692)/cdn.vox-cdn.com/uploads/chorus_image/image/71981748/FpDehdlWcAAnJLi.0.jpg",
//   },
//   {
//     title: "McCormick Tribune Ice Rink",
//     date: "2024-01-11",
//     venue: "Millennium Park",
//     category: "Sports",
//     image:
//       "https://cdn.choosechicago.com/uploads/2023/11/mpicerink-900x400.jpg",
//   },
//   {
//     title: "Tampa Bay Chocolate Festival",
//     date: "2024-02-19",
//     venue: "Gulfview Square Mall",
//     time: "10:00 AM - 5:00 PM",
//     category: "Food",
//     image:
//       "https://thatssotampa.com/wp-content/uploads/2023/12/ChocFestNew.jpg",
//   },
//   {
//     title: "United States Grand Prix",
//     date: "2024-10-25",
//     venue: "Circuit of the Americas",
//     time: "2:00 PM",
//     category: "Sports",
//     image:
//       "https://media.formula1.com/content/dam/fom-website/sutton/2022/USA/Sunday/1435987206.jpg.img.1536.high.jpg",
//   },
//   {
//     title: "Squash court reservation",
//     date: "2024-02-23",
//     venue: "IU Recreational Sports Center",
//     category: "Sports",
//     time: "6:00 PM",
//     image: "https://indianapublicmedia.org/images/news-images/srsc.jpg",
//   },
//   {
//     title: "Focus room reservation",
//     date: "2024-02-20",
//     venue: "Herman B Wells Library",
//     category: "Education",
//     time: "9:00 AM - 11:00 AM",
//     image:
//       "https://www.wbiw.com/wordpress/wp-content/uploads/2020/10/herman-library.jpg",
//   },
// ];
const BrowseEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState<IVenue[]>([]);
  const currentFilters = useSelector((state: any) => state.filter);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { getAllEvents, getAllVenues } = useApi();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      loadingActions.setLoading({
        isLoading: true,
        message: "",
      }),
    );
    getAllEvents().then((res) => {
      setEvents(res);
      setFilteredEvents(res);
    });
    getAllVenues().then((res) => {
      setVenues(res);
    });
  }, []);
  // console.log("events", events, "venues", venues);
  useEffect(() => {
    if (events.length > 0 && venues.length > 0)
      dispatch(
        loadingActions.setLoading({
          isLoading: false,
          message: "",
        }),
      );
  }, [events, venues]);

  useEffect(() => {
    if (
      currentFilters.search === "" &&
      currentFilters.categoryFilters.length === 0 &&
      currentFilters.locationFilters.length === 0 &&
      currentFilters.dateFilters.length === 0
    ) {
      setFilteredEvents(events);
    }
    if (currentFilters.search !== "") {
      setFilteredEvents(
        events.filter((event: any) =>
          event.name
            .toLowerCase()
            .includes(currentFilters.search.toLowerCase()),
        ),
      );
    }
    if (currentFilters.categoryFilters.length > 0) {
      setFilteredEvents(
        events.filter((event: any) => {
          let venueName = venues.find(
            (venue: any) => venue.id === event.venueId,
          )?.name;
          return currentFilters.categoryFilters.includes(venueName);
        }),
      );
    }
    if (currentFilters.locationFilters.length > 0) {
      setFilteredEvents(
        events.filter((event: any) => {
          return currentFilters.locationFilters.includes(
            venues.find((venue: any) => venue.id === event.venueId)?.city,
          );
        }),
      );
    }
    if (currentFilters.dateFilters.length > 0) {
      setFilteredEvents(
        events.filter((event: any) => {
          console.log("event", event.startTime.split("T")[0]);

          return currentFilters.dateFilters.includes(
            new Date(event.startTime.split("T")[0]).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "long",
              },
            ),
          );
        }),
      );
    }
  }, [currentFilters]);
  // console.log("filteredEvents", filteredEvents);
  // retrieve cities from venues and store in an array string[] and remove duplicates

  const cities = venues
    .map((venue: any) => venue.city)
    .filter((value, index, self) => self.indexOf(value) === index);

  const venueNames = venues.map((venue: any) => venue.name);

  const dates = events.map((event: any) => event.startTime.split("T")[0]);
  return (
    <>
      <Navbar />
      <div className="browse-events-page-container">
        <div className="filter-box-container">
          <FilterBox location={cities} date={dates} venues={venueNames} />
        </div>
        <div className="all-events-container">
          {events.length > 0 ? (
            filteredEvents.map((event: any) => {
              return (
                <EventGridCard
                  title={event.name}
                  date={event.startTime.split("T")[0]}
                  venueName={
                    venues.find((venue: any) => venue.id === event.venueId)
                      ?.name
                  }
                  image={event.images[0]}
                  key={event.name}
                  venueId={event.venueId}
                  event={event}
                  venue={venues.find(
                    (venue: any) => venue.id === event.venueId,
                  )}
                />
              );
            })
          ) : (
            <h2>No events found</h2>
          )}
        </div>
      </div>
      <Footer />
      <LoadingModal message="Loading Events..." />
    </>
  );
};
export default BrowseEventsPage;
