import BreadCrumb from "@/components/module/breadcrumb";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header-nav/header";
import CheckoutSection from "@/components/template/ckeckout/checkoutSection";

export default function CheckOut() {
  return (
    <>
      <Header />
      <BreadCrumb path={"ثبت سفارش"} />
      <CheckoutSection />
      <Footer />
    </>
  );
}
