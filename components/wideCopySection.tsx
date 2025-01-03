import Image from "next/image";

export function WideCopySection() {
  return (
    <div className="w-full h-[300px] bg-cyan-900 bg-opacity-60 justify-center items-center inline-flex md:mt-12 relative">
      <Image
        alt="bg"
        fill
        src={"/widecopybg.jpg"}
        className="absolute w-full object-cover object-top brightness-90"
      />
      <div className="max-w-[500px] text-center text-white text-2xl z-10">
        We&apos;ll make sure you have the
        <br />
        best experience
      </div>
    </div>
  );
}
