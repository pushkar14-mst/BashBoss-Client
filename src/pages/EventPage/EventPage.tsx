import { useLocation, useNavigate } from "react-router";
import Calendar from "../../components/UI/Calendar/Calendar";
import Navbar from "../../components/UI/Navbar/Navbar";

import "./EventPage.css";
// import { events } from "../../dummyData";
import { useDispatch, useSelector } from "react-redux";
import ReviewsAccordian from "../../components/ReviewsAccordian/ReviewsAccordian";
import { useEffect, useState } from "react";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import Footer from "../../components/UI/Footer/Footer";
import { IEvent } from "../../IEvent";
import { IVenue } from "../../IVenue";
import useApi from "../../hooks/apiHook";
import { setRecentlyBookedEvent } from "../../store/booked-event-store";

interface IEventN extends IEvent {
  description?: string;
}
const EventPage: React.FC = () => {
  const [overallRating, setOverallRating] = useState<number>(0);
  // const { venueId } = useParams();
  const identifiedEvent = useLocation().state.event as IEventN;
  const identifiedVenue = useLocation().state.venue as IVenue;
  const bookedEvents = useSelector(
    (state: any) => state.bookedEvents.bookedEvents,
  );
  const checkIfBooked = bookedEvents.find(
    (event: any) => event.eventId === identifiedEvent.id,
  );
  console.log(checkIfBooked, bookedEvents);

  const details = JSON.parse(identifiedVenue.details);
  const { createReservation } = useApi();
  if (!identifiedEvent || !identifiedVenue) {
    return <h2>Event not found</h2>;
  }
  console.log(identifiedEvent, identifiedVenue);

  const date = new Date(identifiedEvent.startTime);
  const day = date.getDate().toString();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear().toString();
  const navigate = useNavigate();
  // const googleUserName = useSelector((state: any) => state.googleUser.name);
  const normalUser = useSelector((state: any) => state.normalUser);
  const dispatch = useDispatch();
  // console.log(identifiedEvent);
  // make dummy reviews
  const reviews = [
    {
      id: "1",
      rating: 5,
      review: "This is a great event",
      name: "John Doe",
      date: "2021-10-20",
    },
    {
      id: "2",
      rating: 4,
      review: "This is a great event",
      name: "John Doe",
      date: "2021-10-20",
    },
    {
      id: "3",
      rating: 3,
      review: "This is a great event",
      name: "John Doe",
      date: "2021-10-20",
    },
    {
      id: "4",
      rating: 2,
      review: "This is a great event",
      name: "John Doe",
      date: "2021-10-20",
    },
    {
      id: "5",
      rating: 1,
      review: "This is a great event",
      name: "John Doe",
      date: "2021-10-20",
    },
  ];
  console.log(typeof identifiedEvent.cost);
  const redirectToCheckout = (e: any) => {
    e.preventDefault();
    dispatch(
      setRecentlyBookedEvent({
        eventId: identifiedEvent.id || "",
        eventName: identifiedEvent.name,
        eventLocation: `${identifiedVenue.street}, ${identifiedVenue.city}, ${identifiedVenue.state}, ${identifiedVenue.zipcode}`,
        eventTime: `${day} ${month} ${year}`,
        eventDate: `${day} ${month} ${year}`,
      }),
    );
    // localStorage.setItem("activityId", identifiedEvent.id || "");
    createReservation({
      activityId: identifiedEvent.id,
      venueId: identifiedVenue.id,
    }).then((res) => {
      if (res === 400 || 500) {
        alert("Booking Successful");
      }
    });

    if (identifiedEvent.cost === "0.00") {
      alert("Booking Successful");
      return navigate("/payment-success");
    }
    navigate("/checkout", {
      state: {
        checkout: {
          amount: identifiedEvent.cost,
          eventName: identifiedEvent.name,
          eventLocation: `${identifiedVenue.street}, ${identifiedVenue.city}, ${identifiedVenue.state}, ${identifiedVenue.zipcode}`,
          eventTime: `${day} ${month} ${year}`,
          eventDate: `${day} ${month} ${year}`,
          userName: normalUser?.username || "",
        },
      },
    });
  };

  const overallRatingHandler = () => {
    // if (identifiedEvent.reviews.length === 0) {
    //   return;
    // }
    // const reviews = identifiedEvent.reviews;
    let sum = 0;
    reviews.forEach((review: any) => {
      sum += review.rating!;
    });

    const overallRating = sum / reviews.length;
    setOverallRating(overallRating);
    const outterMainCircle = document.querySelector(
      ".main-rating-circle-outter",
    ) as HTMLDivElement;
    const innerMainCircle = document.querySelector(
      ".main-rating-circle",
    ) as HTMLDivElement;
    const percentage = ((overallRating - 1) / (5 - 1)) * 100;
    outterMainCircle.style.background = `conic-gradient(#6b6b6b ${percentage}%, #6b6b6b69 0%)`;
    innerMainCircle.style.background = `conic-gradient(#161b33 ${percentage}%, #161b33 0%)`;
  };
  useEffect(() => {
    overallRatingHandler();
  }, [date]);
  return (
    <>
      <Navbar />
      <div className="event-page-container">
        <div className="cover-image">
          <img src={identifiedEvent.coverImg} alt="event" />
        </div>
        <div className="event-details">
          <div className="event-details-container-1">
            <h1>{identifiedEvent.name}</h1>
            <div className="event-category">
              <p>{identifiedVenue.venueType}</p>
            </div>
            <p>{identifiedEvent?.description}</p>
            <div className="event-notes">
              <h3>Venue Notes</h3>
              <ul>
                {details.venueNotes?.split(".").map((note: any) => {
                  return note ? <li>{note}</li> : null;
                })}
              </ul>
            </div>
            {reviews.length > 0 ? (
              <>
                <div className="overall-rating">
                  <h1>Rated</h1>
                  <div className="main-rating-circle-outter">
                    <div className="main-rating-circle">
                      <p>{overallRating}</p>
                    </div>
                  </div>
                </div>
                <ReviewsAccordian reviews={reviews} />
              </>
            ) : (
              <h3>No reviews yet</h3>
            )}
            <ReviewForm />
          </div>
          <div className="event-details-container-2">
            <div className="event-organizer">
              <h3>Event Organizer</h3>
              <p>{details.eventOrganizer}</p>
            </div>
            <Calendar day={[day]} month={month} year={year} />
            <div className="event-info">
              <div className="event-location">
                <h3>Location</h3>
                <p>{`${identifiedVenue.street}, ${identifiedVenue.city}, ${identifiedVenue.state}, ${identifiedVenue.zipcode}`}</p>
              </div>
              <div className="event-cost">
                <h3>Cost</h3>
                <p>
                  {identifiedEvent.cost === "0.00"
                    ? "Free"
                    : `${identifiedEvent.cost}`}
                </p>
              </div>
            </div>
            {checkIfBooked ? (
              <button className="book-event-btn" disabled>
                Event Booked
              </button>
            ) : (
              <button className="book-event-btn" onClick={redirectToCheckout}>
                Book Event
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default EventPage;
