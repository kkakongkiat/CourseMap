"use client";

import Image from "next/image";
import { useState, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center w-full max-w-xl text-center">

        {/* Logo Image */}
        <div className="mb-6">
          <Image
            src="/logo.png"
            alt="CourseMap Logo"
            width={120}
            height={120}
            className="object-contain"
            priority
          />
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-bold tracking-wide text-[#0f2d5c] mb-5">
          COURSE<span className="text-[#1a6fcc]">MAP</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base font-semibold text-[#0f2d5c] leading-relaxed mb-8">
          เว็บไซต์สำหรับตรวจสอบแผนการเรียนและรายวิชาต่างๆไว้ในที่เดียว
          <br />
          เพื่อวางแผนการเรียนได้อย่างเหมาะสม
        </p>

        {/* Search Box */}
        <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* AI Tab */}
          <div className="flex px-4 pt-3 pb-0">
            <button className="text-sm text-[#1a6fcc] underline underline-offset-2 font-medium">
              AI ถามคำถามเรื่องการเรียน
            </button>
          </div>

          {/* Input Row */}
          <div className="flex items-center gap-2 px-4 py-3">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="วิชาที่มีรับกี่วิชาต่อปี?"
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
            <button
              onClick={handleSubmit}
              aria-label="ส่งคำถาม"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a6fcc] text-white hover:bg-[#1558aa] transition-colors shrink-0"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}