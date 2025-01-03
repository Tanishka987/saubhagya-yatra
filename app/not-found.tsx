import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/heroSection";
import { Navbar } from "@/components/ui/nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-6 w-full text-xl font-black">
      404 not found!!
    </div>
  );
}
