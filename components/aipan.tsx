import Image from "next/image";
import React from "react";

export default function Aipan({ className }: { className: string }) {
  return (
    <div className={"h-[60px] absolute z-0 " + className}>
      <Image
        alt="pattern"
        src={"/aipan.svg"}
        fill
        className="object-cover object-center"
      />
    </div>
  );
}
