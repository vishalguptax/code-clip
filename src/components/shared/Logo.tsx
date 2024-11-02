import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/icon.png" alt="code clips" height={40} width={40} />
      <h1 className="text-lg font-semibold">Code Clips</h1>
    </div>
  );
}
