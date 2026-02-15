import { StripeElementsOptionsMode, loadStripe } from "@stripe/stripe-js";
import EventTicket from "../../components/UI/EventTicket/EventTicket";
import Footer from "../../components/UI/Footer/Footer";
import Navbar from "../../components/UI/Navbar/Navbar";
import "./CheckoutPage.css";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PaymentLoader from "../../components/UI/PaymentLoader/PaymentLoader";

interface ICheckout {
  amount: number;
  eventName: string;
  eventLocation: string;
  eventTime: string;
  eventDate: string;
  userName: string;
}
const CheckoutPage: React.FC = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
  const isLoggedIn = useSelector((state: any) => state.login.isLoggedin);
  //   console.log(isLoggedIn);

  const location = useLocation();
  const checkout: ICheckout = location.state.checkout;
  const options: StripeElementsOptionsMode = {
    mode: "payment",
    amount: 1090,
    currency: "usd",
    appearance: {
      theme: "stripe",
    },
  };
  return (
    <>
      <Navbar />
      {isLoggedIn && checkout ? (
        <>
          <div className="checkout-page-container">
            <h1
              style={{
                color: "#caf0f8",
                marginTop: "20px",
              }}
            >
              Checkout Page
            </h1>
            <div className="chekout-container">
              <div className="ticket-container">
                <EventTicket
                  amount={checkout.amount}
                  eventName={checkout.eventName}
                  eventLocation={checkout.eventLocation}
                  eventTime={checkout.eventTime}
                  eventDate={checkout.eventDate}
                  userName={checkout.userName}
                />
              </div>
              <div className="checkout-form-element-container">
                <h2
                  style={{
                    textAlign: "center",
                  }}
                >
                  Choose Payment Option
                </h2>

                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm
                    amount={checkout.amount}
                    eventName={checkout.eventName}
                    eventLocation={checkout.eventLocation}
                    eventTime={checkout.eventTime}
                    eventDate={checkout.eventDate}
                    userName={checkout.userName}
                  />
                </Elements>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100vh",
              color: "#caf0f8",
            }}
          >
            <h1>Please Login to proceed.</h1>
            <button>
              <Link
                to="/login"
                state={{ linkFor: "login" }}
                style={{
                  color: "#caf0f8",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </button>
          </div>
        </>
      )}
      <PaymentLoader />
      <Footer />
    </>
  );
};
export default CheckoutPage;
