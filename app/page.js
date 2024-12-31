import Footer from "@/components/module/footer";
import StarredProduct from "@/components/template/starred-product";
import AdSectionOne from "@/components/template/ad";
import ArticlesSection from "@/components/template/articles";
import HomeSlider from "@/components/template/homeslider";
import LastestProduct from "@/components/template/lastestproduct";

export default async function HomePage() {
  return (
    <>
      <HomeSlider />
      <LastestProduct />
      <StarredProduct />
      <AdSectionOne />
      <ArticlesSection />
      <Footer />
    </>
  );
}
