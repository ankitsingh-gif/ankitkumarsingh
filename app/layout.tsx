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
  title: "Ankit Kumar Singh — Marketing, AI & Full-Stack Portfolio",
  description:
    "Strategic Marketing Professional, AI Integration Specialist, and Full-Stack Developer. 6+ years building at the intersection of Marketing, AI & Technology.",
  keywords: [
    "Ankit Kumar Singh", "Marketing", "AI", "Full Stack Developer",
    "Next.js", "Portfolio", "Prompt Engineering", "Resurgent India",
  ],
  authors: [{ name: "Ankit Kumar Singh" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
