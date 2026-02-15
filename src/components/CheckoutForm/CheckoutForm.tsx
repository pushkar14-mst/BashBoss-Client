import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading, unSetLoading } from "../../store/payment-loader-store";
// import { setBookedEvent } from "../../store/booked-event-store";

interface ICheckoutFormProps {
  amount: number;
  eventName: string;
  eventLocation: string;
  eventTime: string;
  eventDate: string;
  userName: string;
}

const CheckoutForm: React.FC<ICheckoutFormProps> = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const baseApi = import.meta.env.VITE_BASE_VAB_API;
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  // const [emailInput, setEmailInput] = useState<string>("");
  const dispatch = useDispatch();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (elements == null || stripe == null) {
      return;
    }
    dispatch(setLoading());
    // dispatch(
    //   setBookedEvent({
    //     eventName: props.eventName,
    //     eventLocation: props.eventLocation,
    //     eventTime: props.eventTime,
    //     eventDate: props.eventDate,
    //   })
    // );
    const { error: submitError } = await elements.submit();
    if (submitError?.message) {
      // Show error to your customer
      dispatch(unSetLoading());
      setErrorMessage(submitError.message);
      return;
    }

    const response = await axios.post(
      `${baseApi}createPaymentIntent`,
      { amount: props.amount * 100 },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_STRIPE_SK}`,
        },
      }
    );
    const data = await response.data;
    const { clientSecret } = data;

    // Confirm the payment with the client secret

    const { error } = await stripe.confirmPayment({
      elements: elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      clientSecret,
      redirect: "always",
    });
    dispatch(unSetLoading());
    if (error) {
      dispatch(unSetLoading());
      // Show error to your customer
      setErrorMessage(error.message);
    } else {
      // Payment succeeded, handle success case
      console.log("Payment succeeded!");
    }
  };

  return (
    <div className="checkout-form-container">
      <form onSubmit={handleSubmit}>
        <PaymentElement className="payment-element" />
        <button
          disabled={!stripe || !elements}
          style={{
            marginTop: "20px",
            width: "100%",
          }}
        >
          Pay
        </button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
