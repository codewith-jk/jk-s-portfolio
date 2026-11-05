
import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

// Elegant editorial heading font
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "JK — Jajati Keshari Nayak",
    template: "%s | JK",
  },
  description:
    "Jajati Keshari Nayak — Full Stack Developer engineering modern web applications, scalable digital systems and immersive digital experiences.",
  keywords: [
    "Jajati Keshari Nayak",
    "JK Portfolio",
    "MERN Stack Developer",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "MongoDB Developer",
    "Web Developer India",
  ],
  authors: [
    {
      name: "Jajati Keshari Nayak",
    },
  ],
  openGraph: {
    title: "JK — Jajati Keshari Nayak",
    description:
      "Engineering digital experiences through modern web technologies.",
    type: "website",
    siteName: "JK Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Browser viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

// Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${inter.variable} ${spaceMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
