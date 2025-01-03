import Image from "next/image";

export function GallerySection() {
  return (
    <section className="max-w-4xl p-2 md:px-0 w-full grid gap-6">
      <div className="text-2xl font-bold z-10">Gallery</div>
      <div className="w-full grid grid-cols-2 auto-grid-rows md:grid-cols-3 md:grid-rows-2 justify-start gap-1 md:gap-4">
        <div className="w-full h-[200px] bg-zinc-300 rounded-[5px] relative overflow-clip">
          <Image
            alt="asset image"
            src={"/h1.JPG"}
            fill
            className="object-cover object-bottom"
          />
        </div>
        <div className="w-full h-[200px] bg-zinc-300 rounded-[5px] relative overflow-clip">
          <Image
            alt="asset image"
            src={"/h2.JPG"}
            fill
            className="object-cover object-bottom"
          />
        </div>
        <div className="w-full h-[200px] bg-zinc-300 rounded-[5px] relative overflow-clip md:col-span-2 md:row-start-2">
          <Image
            alt="asset image"
            src={"/v1.JPG"}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="w-full h-full min-h-[200px] bg-zinc-300 rounded-[5px] relative overflow-clip md:row-span-2">
          <Image
            alt="asset image"
            src={"/v2.JPG"}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
