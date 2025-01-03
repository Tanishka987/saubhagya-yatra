import BookingForm from "@/components/bookingForm";
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage as urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import * as React from "react";

export const revalidate = 30;

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

export default async function Blogs({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug[0]);

  if (data === null) {
    redirect("/404");
  }

  return (
    <>
      <div className="max-w-4xl w-full h-fit flex flex-col md:flex-row relative gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 absolute -top-28 text-white">
            {data.location[0]}
          </h1>

          {data.mainImage && (
            <div className="aspect-video overflow-clip rounded-md grid place-content-center relative">
              <Image
                src={urlFor(data.mainImage)}
                fill
                alt="Title Image"
                priority
                className="object-cover"
              />
            </div>
          )}

          <div className="mt-8 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
            <p>{data.description}</p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Package Details</h2>
            <ul className="list-disc pl-6">
              <li>
                <span className="font-semibold">Price:</span> Rs {data.price}
              </li>
              <li>
                <span className="font-semibold">Location:</span>{" "}
                {`${data.location[0]}, ${data.location[1]}`}
              </li>
              <li>
                <span className="font-semibold">Seats:</span> {data.seats}
              </li>
              {data.extras && (
                <li>
                  <span className="font-semibold">Extras:</span>{" "}
                  {data.extras.join(", ")}
                </li>
              )}
            </ul>
          </div>
        </div>

        <BookingForm />
      </div>
    </>
  );
}

async function getData(slug: string): Promise<Package> {
  const query = `*[_type=='packages' && slug.current == '${slug}'][0]`;
  const data = await sanityClient.fetch(query);
  return data;
}
