import AccountStatement from "../features/FrontDesk/Payment/AccountStatement";
import PaymentDetails from "../features/FrontDesk/Payment/PaymentDetails";

export default function Payment() {
  return (
    <div>
      <PaymentDetails />
      <AccountStatement />
    </div>
  );
}
