import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/main.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Библиотека МИСиС",
  description: "Новая, модная, свежая",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>{children}</body>
    </html>
  );
}
