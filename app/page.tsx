import { GallerySection } from "@/components/gallerySection";
import { HeroSection } from "@/components/heroSection";
import { Navbar } from "@/components/ui/nav";
import { WideCopySection } from "@/components/wideCopySection";
import FeaturedPackageSection from "@/components/featuredPackageSection";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedPackageSection />
      <GallerySection />
      <WideCopySection />
      <Footer />
    </>
  );
}
