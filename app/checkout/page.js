import BreadCrumb from "@/components/module/breadcrumb";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header-nav/header";
import CartSection from "@/components/template/cart-section";

export default function CheckOut() {
  return (
    <>
      <Header />
      <BreadCrumb path={"تکمیل سفارش"} />

      <CartSection />

      <Footer />
    </>
  );
}
