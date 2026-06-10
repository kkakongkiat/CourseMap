"use client";

import Image from "next/image";

export default function electivePage() {
  return (
    <main className="flex-1 bg-white flex flex-col items-center pt-16 px-4">
      <div className="flex flex-col items-center w-full max-w-xl text-center">
        <div className="rounded-lg overflow-hidden mb-6">
          <Image
            src="/404-image.png"
            alt="404 Not Found"
            width={240}
            height={240}
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-3xl font-bold tracking-wide text-[#0f2d5c] mt-5">
          อยู่ระหว่างการพัฒนาครับ
        </h1>

      </div>
    </main>
  );
}