import Footer from "@/components/MarketingComp/Footer";
import Heading from "@/components/MarketingComp/Heading";
import Hero from "@/components/MarketingComp/Hero";

export default function MarketingPage() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Hero />
      </div>

      <Footer />
    </div>
  );
}
