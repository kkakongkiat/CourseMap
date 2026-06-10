import Link from "next/link";

export default function DevelopingPage() {
  return (
    <div className="flex flex-col items-center w-full max-w-xl text-center">

        <h1 className="text-3xl font-bold tracking-wide text-[#0f2d5c] mt-5">
          อยู่ระหว่างการพัฒนา
        </h1>
        <p className="text-base font-semibold text-[#0f2d5c] leading-relaxed mb-2">
          หากมีคำถามหรือข้อเสนอแนะสามารถติดต่อได้ที่
        </p>
          <div className="flex items-center gap-4">
            {/* Email */}
            <Link
              href="mailto:kongkiat.a@ku.th"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a6fcc] transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center group-hover:border-[#1a6fcc]/40 group-hover:bg-[#e6f1fb] transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="2,4 12,13 22,4" />
                </svg>
              </span>
              kongkiat.a@ku.th
            </Link>

            {/* Divider */}
            <div className="w-px h-5 bg-gray-200" />

            {/* Instagram */}
            <Link
              href="https://www.instagram.com/_kxngkiiat/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#E1306C] transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center group-hover:border-[#E1306C]/40 group-hover:bg-[#fdf0f4] transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </span>
              _kxngkiiat
            </Link>
          </div>

      </div>
  );
}
