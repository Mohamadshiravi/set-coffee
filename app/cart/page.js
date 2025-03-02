import BreadCrumb from "@/components/module/breadcrumb";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header-nav/header";
import CartSection from "@/components/template/cart-section";

export default async function CartPage() {
  return (
    <>
      <Header />
      <BreadCrumb path={"سبد خرید"} />
      <main className="sm:p-10 p-4 grid lg:grid-cols-[8fr_4fr] sm:grid-cols-[6fr_6fr] sm:gap-10 gap-4 moraba-regular">
        <CartSection />
      </main>
      <Footer />
    </>
  );
}
