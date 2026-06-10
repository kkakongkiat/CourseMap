import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import Topbar from "./components/topBar";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "CourseMap",
  description: "Course Your future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kanit.variable} ${kanit.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Topbar />
        {children}
      </body>
    </html>
  );
}
