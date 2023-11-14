import { FormEvent, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentComponent = ({ cart }) => {

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardEl = elements.getElement(CardElement);

    setIsProcessing(true);

    try {
      const res = await axios.post("http:localhost/8000/stripe", {
        cart,
      });

      const { client_secret: clientSecret } = res.data;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardEl!,
        },
      });

      if (!paymentIntent) {
        setPaymentStatus("Payment failed!");
      } else {
        setPaymentStatus(paymentIntent.status);
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus("Payment failed!");
    }

    setIsProcessing(false);
  };

  return (
    <div style={{ fontSize: "20px" }}>
      <form onSubmit={handleSubmit} id="payment-form">
        <label htmlFor="card-element">Place order</label>
        <CardElement id="card-element" />
        {!isProcessing && (
          <button
            style={{
              marginTop: "16px",
              height: "31px",
              backgroundColor: "#f0c14b",
              color: "black",
              display: "flex",
              fontWeight: 600,
              fontSize: "20px",
              padding: "24px",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Pay
          </button>
        )}
        {isProcessing && <div>Processing...</div>}
        {!isProcessing && paymentStatus && <div>Status: {paymentStatus}</div>}
      </form>
    </div>
  );
};

const PaymentGateway = (props) => {
  const stripePromise = loadStripe("pk_test_51Lg6bmChkdjnRPrOhs25veo0iLR9PEHlNTSGs9yksQsfgUjqj19sNvOFSYcmRitBZ5Hbo5fwT2SAm3l6RX1UkG9600rtFTcjUi");
  const { cart } = props;

  return (
    <Elements stripe={stripePromise}>
      <PaymentComponent cart={cart} />
    </Elements>
  );
};

export default PaymentGateway;
