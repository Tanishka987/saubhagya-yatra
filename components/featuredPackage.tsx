import { urlForImage } from "@/sanity/lib/image";
import { randomUUID } from "crypto";
import Image from "next/image";
import Link from "next/link";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiBarbecue } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";

interface FeaturedPackageProps {
  price: number;
  location: Array<string>;
  description: string;
  seats: number;
  extras?: Array<string>;
  imageUrl: string;
  slug: string;
}

export function FeaturedPackage({
  price,
  location,
  description,
  seats,
  extras,
  imageUrl,
  slug,
}: FeaturedPackageProps) {
  return (
    <Link
      href={"/packages/" + slug}
      className="min-w-[300px] md:w-[366px] h-fit bg-gradient-to-br from-blue-400 to-blue-600 text-white z-10 rounded-[5px] shadow-md border-border border-2 flex-col justify-start items-center gap-[30px] inline-flex overflow-clip transition-transform transform hover:scale-[1.01]"
    >
      <div className="h-full w-full relative flex-col justify-start items-start flex">
        <div className="min-h-[200px] w-full inline-flex items-end bg-black relative">
          <div className="absolute top-0 left-0 z-0 w-full h-[200px] overflow-hidden">
            <Image
              alt="location image"
              src={imageUrl}
              height={200}
              width={400}
              priority
              className="object-cover object-center"
            />
          </div>
          <div className="p-1 md:p-3 md:py-2 md:pb-0 gap-1 md:pl-6 w-full inline-flex items-baseline z-10 bg-gradient-to-t from-[#000000a8] to-transparent">
            <div className="text-white text-3xl font-black">
              Rs {price || "NA"}
            </div>
            <div className="w-[41.56px] h-3 text-white text-xs">/NIGHT</div>
          </div>
        </div>
        <div className="p-2 md:p-6 inline-flex flex-col justify-between h-full">
          <div className="gap-2 grid">
            <div className="font-semibold text-lg">{location[0] || "NA"}</div>
            <div className="flex items-center gap-1 mb-1">
              <MdLocationOn className="h-3 w-3 text-blue-300" />
              <div className="text-xs leading-tight">Location</div>
              <div className="text-xs font-bold leading-tight">
                {location[1] || "NA"}
              </div>
            </div>

            <div className="line-clamp-5">{description || "NA"}</div>
            <div className="w-fit h-8 md:my-2 my-1 relative rounded-[20px] border border-gray-200 inline-flex gap-2 items-center px-3 bg-white text-blue-950">
              <BsFillPeopleFill className="text-blue-950 w-3" />
              <div className="flex gap-1 items-center">
                <div className="text-xs leading-tight">Up to</div>
                <div className="text-xs font-bold leading-tight">
                  {seats | 1}
                </div>
                <div className="text-xs leading-tight">guests</div>
              </div>
            </div>
            <div className="flex flex-col mt-1 gap-2">
              <div className="font-bold flex-1">Extras</div>
              <div className="flex justify-start gap-2">
                {extras?.map((activity) => (
                  <span
                    key={activity + randomUUID()}
                    className="bg-blue-500 text-white p-1 rounded-md"
                  >
                    {activity}
                  </span>
                )) || "NA"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
