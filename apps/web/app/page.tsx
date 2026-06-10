"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex-1 bg-[#f7f9fc] flex flex-col items-center pt-16 px-4">
      <div className="flex flex-col items-center w-full max-w-xl text-center">
        <div >
          <Image
            src="/coursemap-logo.png"
            alt="CourseMap Logo"
            width={240}
            height={240}
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-3xl font-bold tracking-wide text-[#0f2d5c] mb-5">
          COURSE<span className="text-[#1a6fcc]">MAP</span>
        </h1>

        <p className="text-base font-semibold text-[#0f2d5c] leading-relaxed mb-8">
          เว็บไซต์สำหรับตรวจสอบแผนการเรียนและรายวิชาต่างๆไว้ในที่เดียว
          <br />
          เพื่อวางแผนการเรียนได้อย่างเหมาะสม
        </p>
      
          <Link
              href="/roadmap"
              className="px-4 py-[7px] text-sm rounded-md bg-[#0f2d5c] text-white font-medium hover:bg-[#1a4a8a] transition-colors"
            >
            ดูแผนผังการเรียน
          </Link>

      </div>
    </main>
  );
}