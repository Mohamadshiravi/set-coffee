import BreadCrumb from "@/components/module/breadcrumb";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header-nav/header";
import CheckoutSection from "@/components/template/ckeckout/checkoutSection";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import { redirect } from "next/navigation";

export default async function CheckOut() {
  const theUser = await isUserLogedIn();
  if (!theUser) {
    return redirect("/auth/login");
  }
  return (
    <>
      <Header />
      <BreadCrumb path={"ثبت سفارش"} />
      <CheckoutSection />
      <Footer />
    </>
  );
}
