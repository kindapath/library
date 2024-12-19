"use client";

import { Inter } from "next/font/google";
import "@/styles/main.scss";

import store from "@/store/store";
import { Provider } from "react-redux";
import Header from "@/components/common/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Provider store={store}>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
