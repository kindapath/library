"use client";

import Image from "next/image";
import Navigation from "@/components/common/Navigation";

const Header = () => {
  return (
    <header className="page__header">
      <div className="page__header-content">
        <Image
          src="/images/misis-icon.png"
          alt="MISIS Icon"
          width={70}
          height={70}
          className="page__icon"
        />
        <h1 className="page__title">Библиотека МИСиС</h1>

        <Navigation />
      </div>
    </header>
  );
};

export default Header;
