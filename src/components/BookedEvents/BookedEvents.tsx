import { Link } from "react-router-dom";

import "./BookedEvents.css";
// import { IEvent } from "../../IEvent";
import { useEffect, useState } from "react";
import { IVenue } from "../../IVenue";
import useApi from "../../hooks/apiHook";
import { useDispatch, useSelector } from "react-redux";
import { IBookedEvent, setBookedEvent } from "../../store/booked-event-store";
import LoadingModal from "../UI/Modal/LoadingModal";
import { loadingActions } from "../../store/loading-store";

const BookedEvents = () => {
  const [venues, setVenues] = useState<IVenue[]>([]);
  const [bookedEvents, setBookedEvents] = useState<any[]>([]);
  const normalUser = useSelector((state: any) => state.normalUser);
  // console.log("normalUser", normalUser);

  const { getAllVenues, retrieveAllReservations } = useApi();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingActions.setLoading({ isLoading: true, message: "" }));
    getAllVenues().then(async (res) => {
      const response = await res;
      setVenues(response);
    });
    console.log(venues);
  }, []);
  useEffect(() => {
    retrieveAllReservations().then((res: any) => {
      dispatch(loadingActions.setLoading({ isLoading: false, message: "" }));
      console.log("res", res);

      setBookedEvents(res);
      let data: IBookedEvent[] = [];

      res
        .filter((event: any) => {
          return event.userId === normalUser.id;
        })
        .map((event: any) => {
          let identifiedVenue = venues.find(
            (venue: any) => venue.id === event.venueId
          );
          console.log(identifiedVenue);
          let date = new Date(event.activity.startTime).toLocaleDateString(
            "en-US",
            {
              day: "numeric",
              weekday: "long",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            }
          );
          data.push({
            eventId: event.id,
            eventName: event.activity.name,
            eventDate: date,
            eventTime: event.activity.startTime,
            coverImg: event.activity.coverImg,
            eventLocation: `${identifiedVenue?.street}, ${identifiedVenue?.city}, ${identifiedVenue?.state}, ${identifiedVenue?.zipcode}`,
            venueName: identifiedVenue?.name,
          });
        });
      dispatch(setBookedEvent(data));
    });
  }, [venues.length > 0]);
  console.log(bookedEvents);

  return (
    <>
      <div className="booked-events-container">
        <h2>Your Booked Events</h2>
        <div className="booked-events">
          {bookedEvents
            .filter((event: any) => {
              return event.userId === normalUser.id;
            })
            .filter((event: any) => {
              return event.status === "Confirmed";
            })
            .map((event, index) => {
              let date = new Date(event.activity.startTime).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "long",
                }
              );
              return (
                <div key={index} className="booked-event">
                  <div className="event-image">
                    <img
                      src={event.activity.coverImg}
                      alt={event.activity.name}
                    />
                  </div>
                  <div className="event-key-details">
                    <h3>{event.activity.name}</h3>
                    <p>
                      {
                        venues.find((venue: any) => venue.id === event.venueId)
                          ?.name
                      }
                    </p>
                    <p>{date}</p>
                  </div>
                  <div className="manage-event">
                    <button>
                      <Link
                        to={{
                          pathname: "/manage-event",
                        }}
                        state={{
                          bookedEventId: event.id,
                          userId: event.userId,
                        }}
                        onClick={() => {
                          localStorage.setItem("reservationId", event.id);
                        }}
                      >
                        Manage Event
                      </Link>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <LoadingModal message="Loading your booked events." />
    </>
  );
};

export default BookedEvents;
