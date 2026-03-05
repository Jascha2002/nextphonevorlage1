import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import ServicesSection from "@/components/home/ServicesSection";
import WhyNextPhones from "@/components/home/WhyNextPhones";
import PartnerLogosCarousel from "@/components/home/PartnerLogosCarousel";
import AktuelleAktionen from "@/components/home/AktuelleAktionen";
import TarifRechnerQuiz from "@/components/home/TarifRechnerQuiz";
import ReviewsSection from "@/components/home/ReviewsSection";
import StromCheckTeaser from "@/components/home/StromCheckTeaser";
import StandortePreview from "@/components/home/StandortePreview";
import FoerdermittelSection from "@/components/home/FoerdermittelSection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <WhyNextPhones />
      <PartnerLogosCarousel />
      <AktuelleAktionen />
      <TarifRechnerQuiz />
      <StromCheckTeaser />
      <StandortePreview />
      <ReviewsSection />
      <FoerdermittelSection />
    </>
  );
};

export default Index;
