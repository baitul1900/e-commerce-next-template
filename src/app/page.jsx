import Hero from '@/components/home/Hero';
import PopularProducts from '@/components/home/products/PopularProducts';
import CategorySlider from '@/components/home/products/CategorySlider';
import PromoBanner from '@/components/home/promo/PromoBanner';
import DailyBestDeals from '@/components/home/daily-sales/DailyBestDeals';
import CTASection from '@/components/home/cta/CTASection';

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <CategorySlider />
      <PopularProducts />
      <PromoBanner />
      <DailyBestDeals />
      <CTASection />
    </div>
  );
}
