import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-space-grotesk",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ankit Kumar Singh — Strategic Marketing & AI | 3D Portfolio",
  description:
    "Strategic Marketing Professional, AI Integration Specialist, and Full-Stack Web/App Developer. Building at the intersection of Marketing, AI & Technology.",
  keywords: [
    "Ankit Kumar Singh",
    "Marketing",
    "AI",
    "Full Stack Developer",
    "Next.js",
    "Portfolio",
    "Prompt Engineering",
    "Resurgent India",
  ],
  authors: [{ name: "Ankit Kumar Singh" }],
  openGraph: {
    title: "Ankit Kumar Singh — Strategic Marketing & AI",
    description:
      "Strategic Marketing Professional, AI Integration Specialist, and Full-Stack Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-void text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
