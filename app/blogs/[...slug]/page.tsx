import { sanityClient } from "@/sanity/lib/client";
import { urlForImage as urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import * as React from "react";

export const revalidate = 30;

export default async function Blogs({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug[0]);

  if (data === null) {
    redirect("/404");
  }

  return (
    <div className="max-w-4xl m-4 grid gap-6">
      <div className="aspect-video grid place-content-center overflow-clip border rounded-md relative">
        {data.mainImage && (
          <Image
            src={urlFor(data.mainImage)}
            alt="Title Image"
            priority
            fill
            className="object-cover object-center"
          />
        )}
      </div>
      <h1 className="text-3xl font-bold">{data.title}</h1>

      <div className="prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.body} />
      </div>
    </div>
  );
}

async function getData(slug: string) {
  const query = `*[_type=='post' && slug.current == '${slug}']{  title,author,body,mainImage}[0]`;
  const data = await sanityClient.fetch(query);
  return data;
}
