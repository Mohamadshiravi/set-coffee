import BreadCrumb from "@/components/module/breadcrumb";
import Header from "@/components/module/header-nav/header";
import productModel from "@/models/product";

import Footer from "@/components/module/footer";
import ShopeSection from "@/components/template/shop-section";
import ConnectTODb from "@/utils/connecttodb";

export default async function AllProducts() {
  ConnectTODb();

  const allProduct = await productModel.find({}, "title score price images", {
    sort: "-_id",
  });
  return (
    <>
      <BreadCrumb path={"فروشگاه"} />
      <ShopeSection products={JSON.parse(JSON.stringify(allProduct))} />
      <Footer />
    </>
  );
}
