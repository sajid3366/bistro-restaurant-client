import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)


const Payment = () => {
    return (
        <div>
            <SectionTitle subHeading="Please Pay" heading="Payment"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOut></CheckOut>
                </Elements>

            </div>
        </div>
    );
};

export default Payment;