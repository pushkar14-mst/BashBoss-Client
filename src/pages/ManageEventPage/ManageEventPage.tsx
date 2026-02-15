import { useLocation, useNavigate } from "react-router";
import Footer from "../../components/UI/Footer/Footer";
import Navbar from "../../components/UI/Navbar/Navbar";
import "./ManageEventPage.css";

import Chat from "../../components/Chat/Chat";
import { useSelector } from "react-redux";
import useApi from "../../hooks/apiHook";
import GroupChat from "../../components/Chat/GroupChat";
import { useState } from "react";

const ManageEventPage: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [toMail, setToMail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: any) => state.normalUser);

  const googleUser = useSelector((state: any) => state.googleUser);
  const normalUser = useSelector((state: any) => state.normalUser);
  console.log("normalUser", normalUser);

  const allBookedEvents = useSelector(
    (state: any) => state.bookedEvents.bookedEvents,
  );
  const bookedEventId = location.state.bookedEventId;
  // console.log(allBookedEvents);
  const userId = location.state.userId;
  console.log("userId", userId);
  // if the user presses back remove the reservationId from the local storage
  window.onpopstate = () => {
    localStorage.removeItem("reservationId");
  };
  const bookedEvent = allBookedEvents.find(
    (event: any) => event.eventId === bookedEventId,
  );
  console.log(bookedEvent);
  const { changeReservationStatus, inviteFriends } = useApi();

  const onCancelEvent = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this event?",
    );
    if (confirmCancel) {
      changeReservationStatus("cancelled");
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="manageEvents-page-container">
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Manage Your Event
        </h1>
        <div className="manageEvents-container">
          <div className="bookedEvent-detail">
            <h2>{bookedEvent.eventName}</h2>
            <img src={bookedEvent.coverImg} alt={bookedEvent.name} />
            {/* <p>
              By <span id="venue-owner-name">{bookedEvent.venueName}</span>
            </p> */}
            <p>
              Venue: <b>{bookedEvent.venueName}</b>
            </p>
            <p>
              Date: <b>{bookedEvent.eventDate}</b>
            </p>
            <p>
              Location: <b>{bookedEvent.eventLocation}</b>
            </p>
            {/* <button
              onClick={() => {
                navigate(`/event/${bookedEvent.eventName}`, {
                  state: { event: bookedEvent },
                });
              }}
            >
              View more details
            </button> */}
          </div>
          <div className="manageOptions-container">
            <h2>Manage Options</h2>
            <div className="cancel-event-option" onClick={onCancelEvent}>
              <i className="bi bi-trash" />
              <h2>Cancel Event</h2>
            </div>
            <div
              className="share-event-option"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setExpanded(true);
              }}
            >
              <i className="bi bi-share" />
              <h2>Share Event</h2>
            </div>
            {expanded && (
              <div className="share-event-inputs">
                {loading ? (
                  <p>Sending invite...</p>
                ) : (
                  <>
                    <input
                      type="email"
                      placeholder="Enter email"
                      style={{
                        width: "80%",
                        padding: "0.5rem",
                        marginBottom: "1rem",
                      }}
                      onChange={(e) => {
                        setToMail(e.target.value);
                      }}
                    />
                    <button
                      onClick={() => {
                        setLoading(true);
                        inviteFriends(toMail, normalUser.username).then(() => {
                          setLoading(false);
                          setExpanded(false);
                        });
                      }}
                    >
                      Send Invite
                    </button>
                  </>
                )}

                <i
                  className="bi bi-x"
                  onClick={() => {
                    setExpanded(false);
                  }}
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                />
              </div>
            )}

            {/* <div className="resend-confirmation-option">
              <i className="bi bi-envelope" />
              <h2>Resend Confirmation</h2>
            </div> */}
          </div>
        </div>
        <div className="chat-section">
          <h2
            style={{
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
            Chat with Venue Owner
          </h2>
          {googleUser && user === null ? (
            <h2>Please Login to chat </h2>
          ) : (
            <>
              <Chat
                sender={user.username}
                event={`${bookedEvent.eventName}-${userId}`}
              />
              <GroupChat sender={user.username} event={bookedEvent.eventName} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageEventPage;
