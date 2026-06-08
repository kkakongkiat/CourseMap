"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "หน้าหลัก", href: "/" },
  { label: "แผนผังการเรียน", href: "/roadmap" },
  { label: "หลักสูตร", href: "/courses" },
  { label: "แผนการเรียน", href: "/plan" },
  { label: "วิชาทั่วไป/เสรี", href: "/elective" },
];

export default function Topbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/coursemap-logo.png"
            alt="CourseMap Logo"
            width={36}
            height={36}
            className="rounded-lg object-contain"
          />
          <span className="text-[17px] font-semibold tracking-tight text-[#0f2d5c]">
            COURSE<span className="text-[#1a6fcc]">MAP</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm rounded-md transition-colors duration-150 ${
                  isActive
                    ? "text-[#1a6fcc] bg-[#e6f1fb] font-medium"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button
            aria-label="ค้นหา"
            className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <Link
            href="/login"
            className="px-4 py-[7px] text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            เข้าสู่ระบบ
          </Link>

          <Link
            href="/register"
            className="px-4 py-[7px] text-sm rounded-md bg-[#0f2d5c] text-white font-medium hover:bg-[#1a4a8a] transition-colors"
          >
            เริ่มต้นใช้งาน
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="เมนู"
        >
          {menuOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2.5 text-sm rounded-md mb-1 transition-colors ${
                  isActive
                    ? "text-[#1a6fcc] bg-[#e6f1fb] font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="/login"
              className="block text-center px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700"
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              href="/register"
              className="block text-center px-4 py-2 text-sm rounded-md bg-[#0f2d5c] text-white font-medium"
            >
              เริ่มต้นใช้งาน
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}