import CheckoutDetails from "./checkoutDetails";
import CheckoutReceipt from "./checkoutReceipt";

export default function CheckoutSection() {
  return (
    <main className="sm:p-10 p-4 grid lg:grid-cols-[6fr_6fr] grid-cols-[1fr] gap-4">
      <CheckoutDetails />
      <CheckoutReceipt />
    </main>
  );
}
