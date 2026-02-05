import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import RealWorldExamples from "@/components/landing/RealWorldExamples";
import VideoDemo from "@/components/landing/VideoDemo";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <RealWorldExamples />
        <VideoDemo />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
