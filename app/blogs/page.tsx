import { Card, CardContent } from "@/components/ui/card";
import { sanityClient as client } from "@/sanity/lib/client";
import { urlForImage as urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
  *[_type == 'post'] | order(_createdAt desc) {
    title,
      description,
      "currentSlug": slug.current,
      mainImage
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: any = await getData();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl relative">
        <h1 className="text-3xl font-bold mb-4 absolute -top-28 text-white">
          Blogs
        </h1>
        {data.map((post: any, idx: any) => (
          <Card key={idx} className="group">
            {post.mainImage && (
              <div className="relative overflow-hidden">
                <Image
                  src={urlFor(post.mainImage)}
                  alt="image"
                  width={500}
                  height={500}
                  priority
                  className="rounded-t-lg h-[200px] object-cover object-center transition-transform transform group-hover:scale-105"
                />
              </div>
            )}

            <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
              <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                {post.description}
              </p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blogs/${post.currentSlug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
