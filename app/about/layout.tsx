import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/heroSection";
import { Navbar } from "@/components/ui/nav";

export default function BlogLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <section className="flex min-h-screen flex-col items-center w-full  overflow-x-clip px-2">
        {children}
      </section>
      <Footer />
    </>
  );
}
