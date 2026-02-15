import { useEffect, useState } from "react";
import EventGridCard from "../UI/EventGridCard/EventGridCard";
// import UserUpcomingEventCard from "../UI/UserUpcomingEventCard/UserUpcomingEventCard";
import "./UserDashboard.css";
import Calendar from "../UI/Calendar/Calendar";
import { useSelector } from "react-redux";
import { IBookedEvent } from "../../store/booked-event-store";

const UserDashboard = () => {
  const [wish, setWish] = useState<string>("");
  const wishes: string[] = ["Good Morning", "Good Afternoon", "Good Evening"];
  const bookedEvents: IBookedEvent[] = useSelector(
    (state: any) => state.bookedEvents.bookedEvents
  );
  console.log(bookedEvents);

  useEffect(() => {
    const date = new Date();

    const hours = date.getHours();
    if (hours < 12) {
      setWish(wishes[0]);
    } else if (hours < 18) {
      setWish(wishes[1]);
    } else {
      setWish(wishes[2]);
    }
  }, []);
  let days: string[] = [];
  bookedEvents
    .filter((currentMonth) => {
      return (
        new Date(currentMonth.eventDate).getMonth() === new Date().getMonth()
      );
    })
    .filter((currentYear) => {
      return (
        new Date(currentYear.eventDate).getFullYear() ===
        new Date().getFullYear()
      );
    })
    .forEach((event) => {
      const date = new Date(event.eventDate);
      days.push(date.getDate().toString());
      console.log(days);
    });
  return (
    <>
      <div className="user-dashboard-container">
        <div className="wish">
          <h1>{wish}</h1>
        </div>
        <h2>Your Calendar</h2>
        <div className="user-calendar">
          <Calendar
            day={days}
            month={new Date().toLocaleString("default", { month: "long" })}
            year={new Date().getFullYear().toString()}
          />
          <div className="upcoming-events-list">
            <h2>Upcoming Events</h2>
            <ul>
              {bookedEvents
                .filter((event) => {
                  return (
                    new Date(event.eventDate).getFullYear() ===
                    new Date().getFullYear()
                  );
                })
                .filter((event) => {
                  return (
                    new Date(event.eventDate).getMonth() ===
                    new Date().getMonth()
                  );
                })
                .filter((event) => {
                  return (
                    new Date(event.eventDate).getDate() + 1 >
                    new Date().getDate()
                  );
                })
                .map((event, index) => {
                  return (
                    <li key={index}>
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {event.eventName}
                      </span>{" "}
                      {event.eventDate}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        {/* <div className="user-upcoming-event">
          <h2>Upcoming Event</h2>
          {bookedEvents
            .sort((a, b) => {
              return (
                new Date(a.eventDate).getTime() -
                new Date(b.eventDate).getTime()
              );
            })
            .map((event, index) => {
              return (
                <UserUpcomingEventCard
                  key={index}
                  title={event.eventName}
                  date={event.eventDate}
                  venue={event.venueName || ""}
                  image={event.coverImg || ""}
                />
              );
            })}{" "}
        </div> */}
        <h2
          style={{
            marginTop: "6rem",
          }}
        >
          Your Bookings
        </h2>
        <div className="user-bookings">
          {bookedEvents
            .filter((event) => {
              return new Date(event.eventDate).getTime() > new Date().getTime();
            })
            .map((_, index) => {
              return (
                <EventGridCard
                  venueId={bookedEvents[index].venueName || ""}
                  key={index}
                  title={bookedEvents[index].eventName}
                  date={bookedEvents[index].eventDate}
                  venueName={bookedEvents[index].venueName || ""}
                  image={bookedEvents[index].coverImg || ""}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
export default UserDashboard;
