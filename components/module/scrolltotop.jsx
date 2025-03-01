"use client";

import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function ScrollToTopBtn() {
  const [isScrolled, setIsScrolled] = useState(true);
  useEffect(() => {
    function HandleTopBtn() {
      const currentScrolled = window.pageYOffset;
      if (currentScrolled > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", HandleTopBtn);
    return () => {
      window.removeEventListener("scroll", HandleTopBtn);
    };
  });
  function GoTopFunction() {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <button
      onClick={GoTopFunction}
      className={`${
        !isScrolled ? "-translate-x-10 opacity-0" : "translate-x-0 opacity-100"
      } fixed sm:bottom-6 bottom-16 sm:left-6 left-4 bg-white transition-all rounded-full sm:text-2xl text-lg text-zinc-500 sm:p-3 p-2 z-50 shadow-3xl hover:bg-zinc-300`}
    >
      <IoIosArrowUp />
    </button>
  );
}
