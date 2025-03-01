import Footer from "@/components/module/footer";
import StarredProduct from "@/components/template/starred-product";
import AdSection from "@/components/template/ad";
import HomeSlider from "@/components/template/homeslider";
import LastestProduct from "@/components/template/lastestproduct";
import Header from "@/components/module/header-nav/header";

export default function HomePage() {
  return (
    <>
      <Header />
      <HomeSlider />
      <LastestProduct />
      <StarredProduct />
      <AdSection />
      <Footer />
    </>
  );
}
