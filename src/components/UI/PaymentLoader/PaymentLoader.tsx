import "./PaymentLoader.css";
import { useSelector } from "react-redux";

const PaymentLoader = () => {
  const loading = useSelector((state: any) => state.paymentLoader.loading);

  return (
    loading && (
      <div className="payment-loader">
        <div className="loading-pulse"></div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            We are processing your payment with{" "}
          </p>
          <span
            style={{
              display: "inline-block",
              width: "100px",
              height: "50px",
              overflow: "hidden",
            }}
          >
            <img
              src="https://woocommerce.com/wp-content/uploads/2011/12/stripe-logo-blue.png"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </span>
        </div>
      </div>
    )
  );
};

export default PaymentLoader;
