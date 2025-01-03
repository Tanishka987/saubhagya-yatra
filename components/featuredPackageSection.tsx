import { sanityClient } from "@/sanity/lib/client";
import { FeaturedPackage } from "./featuredPackage";
import { urlForImage } from "@/sanity/lib/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Package {
  price: number;
  location: [string, string]; // Array with city and state/province
  description: string;
  seats: number;
  extras?: string[]; // Optional array of extras
  mainImage: any;
  slug: { current: string; _type: "slug" };
  featured?: boolean; // Optional flag for featured packages
}

export default async function FeaturedPackageSection() {
  const featuredPackages = await fetchFeaturedPackages();

  return (
    <section className="max-w-4xl p-2 md:p-0 z-10 grid gap-24 md:gap-6 -top-20 md:mt-6 relative items-start w-full h-full">
      <div className="text-white text-2xl font-bold leading-[33px] z-10">
        Featured packages
      </div>
      <ScrollArea>
        <div className="flex gap-2 py-2">
          {featuredPackages.map((_package: Package, i: number) => (
            <FeaturedPackage
              key={_package.description + i} // Use _id for unique keys
              price={_package.price}
              location={_package.location}
              description={_package.description}
              seats={_package.seats}
              extras={_package.extras}
              imageUrl={urlForImage(_package.mainImage)}
              slug={_package.slug.current}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

async function fetchFeaturedPackages() {
  const query = '*[_type == "packages" && featured == true]';
  const featuredPackages = await sanityClient.fetch(query);
  return featuredPackages;
}
