// import { useNavigate } from "react-router";
import successImg from "../../assets/Successful purchase-pana.png";
import Footer from "../../components/UI/Footer/Footer";
// import Navbar from "../../componets/UI/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { resetRecentlyBookedEvent } from "../../store/booked-event-store";
import useApi from "../../hooks/apiHook";
import { useEffect } from "react";

const PaymentSuccessPage = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const bookedEvent = useSelector(
  //   (state: any) => state.bookedEvent.recentlyBookedEvent
  // );
  // console.log(bookedEvent);
  const {
    changeReservationStatus,
    changePaymentStatus,
    validateUserTokenForNormalUser,
  } = useApi();
  useEffect(() => {
    changeReservationStatus("Confirmed");
    changePaymentStatus();
    dispatch(resetRecentlyBookedEvent());
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <h1>Payment Successful!</h1>
        <img
          src={successImg}
          alt="Success"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            maxWidth: "600px",
            maxHeight: "600px",
          }}
        />
        {/* <h2>
          You have successfully booked {bookedEvent.eventName} on{" "}
          {bookedEvent.eventDate} at {bookedEvent.eventTime}
        </h2> */}
        <h2>Thank you for booking with us!</h2>
        <h2>Enjoy your event!</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          {/* <button
            style={{ marginTop: "20px" }}
            onClick={() => {
              validateUserTokenForNormalUser(
                localStorage.getItem("token") as string
              );

              navigate("/");
            }}
          >
            Go back to Home
          </button> */}
          <button
            style={{ marginTop: "20px" }}
            onClick={() => {
              validateUserTokenForNormalUser(
                localStorage.getItem("token") as string,
              );
            }}
          >
            Go to Profile
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccessPage;
