import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import HowItWorks from "@/components/home/HowItWorks";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <main className="pt-[72px]">
        <HeroSection />
        <TrustBar />
        <CategoryGrid />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
