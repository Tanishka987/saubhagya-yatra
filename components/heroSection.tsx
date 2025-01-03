import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { sanityClient } from "@/sanity/lib/client";
import Aipan from "./aipan";

interface LimitedLocation {
  title: string;
  slug: string;
}

export async function HeroSection() {
  const popularLocations: Array<LimitedLocation> =
    await fetchPopularLocations();

  return (
    <section className="w-full h-fit relative grid place-items-center">
      <Aipan className="-bottom-[60px] left-0 w-full" />
      <div className="w-full h-[460px] relative pt-[60px]">
        <Image
          alt="background image"
          src={"/banner.jpg"}
          fill
          className="object-cover object-center brightness-90"
        />
      </div>
      <div className="w-full p-4 md:px-0 md:w-[70vw] max-w-4xl h-fit md:h-[300px] absolute md:top-24 text-white grid gap-2 md:gap-3 backdrop-blur-[1px]">
        <div className="justify-start items-center inline-flex">
          <div className="w-fit max-w-[90vw] text-4xl md:w-[750.89px] md:h-[187.50px] md:text-[75px] font-bold md:leading-[82.50px]">
            Journey to the Divine Char Dham
          </div>
        </div>
        {popularLocations && (
          <div className="w-full grid gap-2">
            <div className="text-sm">Popular locations</div>
            <div className="inline-flex gap-2">
              {popularLocations.map((location, i) => (
                <Button
                  asChild
                  key={location.slug + i}
                  className="w-fit rounded-full bg-white text-black hover:bg-gray-300"
                >
                  <Link href={`/packages/${location.slug}`}>
                    {location.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

async function fetchPopularLocations() {
  const query =
    '*[_type == "packages" && popular == true][0...3]{title, "slug": slug.current}';
  const popularLocations = await sanityClient.fetch(query);
  return popularLocations;
}
