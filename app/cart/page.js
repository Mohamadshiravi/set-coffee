import BreadCrumb from "@/components/module/breadcrumb";
import Footer from "@/components/module/footer";
import CartSection from "@/components/template/cart-section";

export default async function CartPage() {
  return (
    <>
      <Header />
      <BreadCrumb path={"سبد خرید"} />
      <main className="xl:px-10 sm:px-10 px-4 flex xl:flex-row flex-col gap-10 sm:my-10 my-4 moraba-regular">
        <CartSection />
      </main>
      <Footer />
    </>
  );
}
