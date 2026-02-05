import Hero from "@/components/home/Hero";
import CategorySlider from "@/components/home/products/CategorySlider";
import PopularProducts from "@/components/home/products/PopularProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySlider />
      <PopularProducts />
    </>
  );
}
