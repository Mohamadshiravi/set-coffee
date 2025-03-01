import BreadCrumb from "@/components/module/breadcrumb";
import Header from "@/components/module/header-nav/header";

import Footer from "@/components/module/footer";
import ShopeSection from "@/components/template/shop-section";

export default function AllProducts() {
  return (
    <>
      <Header />
      <BreadCrumb path={"فروشگاه"} />
      <ShopeSection />
      <Footer />
    </>
  );
}
