import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="py-12 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-forest/20 dark:text-cream/20 uppercase tracking-widest">
          More content coming soon
        </h2>
      </div>
    </div>
  );
}
