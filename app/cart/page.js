import BreadCrumb from "@/components/module/breadcrumb";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header-nav/header";
import CartSection from "@/components/template/cart-section";

export default async function CartPage() {
  return (
    <>
      <Header />
      <BreadCrumb path={"سبد خرید"} />
      <CartSection />
      <Footer />
    </>
  );
}
