"use client";

import { CgProfile } from "react-icons/cg";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import ProfileSection from "./profile-section";
import axios from "axios";
import { createContext } from "react";

export const HeaderContext = createContext({});

export default function Header({ children }) {
  const UserUrlRegex = /\/p-user\/.*/g;
  const AdminUrlRegex = /\/p-admin\/.*/g;
  const AuthUrlRegex = /\/auth\/[^ ]+/g;

  const pathName = usePathname();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavTop, setIsNavTop] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [theUser, setTheUser] = useState(null);
  const [wishLength, setWishLength] = useState(0);

  const [userCart, setUserCart] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    FetchUserData();
  }, []);
  useEffect(() => {
    function HandleNavBar() {
      const currentScrolled = window.pageYOffset;
      if (currentScrolled > 100) {
        setIsNavTop(true);
        setIsProfileOpen(false);
      } else {
        setIsNavTop(false);
      }
    }

    window.addEventListener("scroll", HandleNavBar);
    return () => {
      window.removeEventListener("scroll", HandleNavBar);
    };
  });
  async function FetchUserData() {
    try {
      setUserCart(JSON.parse(localStorage.getItem("cart")) || []);
      setLoading(true);
      const userDetails = await axios.get("/api/auth/me");

      setTheUser(userDetails.data.theUser);
      setWishLength(userDetails.data.wishLength);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <HeaderContext.Provider value={{ FetchUserData: FetchUserData }}>
      <nav
        id={isNavTop ? "animate-fade" : "no-id"}
        className={` select-none  ${
          isNavTop
            ? "sm:h-[70px] h-[65px] sm:w-[98%] w-full fixed sm:rounded-xl bg-white/80 sm:top-2 top-0 sm:left-[1%] left-0"
            : " sm:py-4 absolute py-3 bg-white w-full top-0 left-0"
        } ${isNavTop ? "lg:px-20" : "lg:px-18"} sm:px-8 px-3 ${
          pathName === "/p-user" ||
          pathName === "/p-admin" ||
          UserUrlRegex.test(pathName) ||
          AdminUrlRegex.test(pathName) ||
          AuthUrlRegex.test(pathName)
            ? "hidden"
            : "flex"
        } border-zinc-200 items-center border justify-center backdrop-blur-xl z-40 transition-all transition`}
      >
        <div className="flex items-center w-full justify-between">
          <button
            onClick={OpenMenu}
            className="lg:hidden shadow-md shadow-zinc-500 block hover:bg-zinc-900 transition bg-zinc-800 text-white sm:h-[50px] h-[40px] aspect-square flex items-center justify-center sm:text-3xl text-2xl rounded-lg"
          >
            <RxHamburgerMenu />
          </button>
          <img src="/img/logo/logonew.png" className="sm:w-[180px] w-[130px]" />
          <div className="moraba-bold text-zinc-600 text-sm lg:flex gap-8 hidden">
            <Link
              href={"/"}
              className={`after:content-[''] hover:after:bg-mybrown2 after:absolute hover:after:h-[3px] hover:after:w-full hover:after:left-0 after:rounded-xl cursor-pointer after:transition-all after:-bottom-3 relative ${
                pathName === "/"
                  ? "after:bg-mybrown2 after:h-[3px] after:left-0 after:w-full"
                  : "after:bg-gray-200 after:h-[5px] after:left-[50%] after:w-[5px]"
              }`}
            >
              صفحه اصلی
            </Link>
            <Link
              href={"/products"}
              className={`after:content-[''] hover:after:bg-mybrown2 after:absolute hover:after:h-[3px] hover:after:w-full hover:after:left-0 after:rounded-xl cursor-pointer after:transition-all after:-bottom-3 relative ${
                pathName === "/products"
                  ? "after:bg-mybrown2 after:h-[3px] after:left-0 after:w-full"
                  : "after:bg-gray-200 after:h-[5px] after:left-[50%] after:w-[5px]"
              }`}
            >
              فروشگاه
            </Link>
            <Link
              href={"/blog"}
              className={`after:content-[''] hover:after:bg-mybrown2 after:absolute hover:after:h-[3px] hover:after:w-full hover:after:left-0 after:rounded-xl cursor-pointer after:transition-all after:-bottom-3 relative ${
                pathName === "/blog"
                  ? "after:bg-mybrown2 after:h-[3px] after:left-0 after:w-full"
                  : "after:bg-gray-200 after:h-[5px] after:left-[50%] after:w-[5px]"
              }`}
            >
              وبلاگ
            </Link>
            <Link
              href={"/contact-us"}
              className={`after:content-[''] hover:after:bg-mybrown2 after:absolute hover:after:h-[3px] hover:after:w-full hover:after:left-0 after:rounded-xl cursor-pointer after:transition-all after:-bottom-3 relative ${
                pathName === "/contact-us"
                  ? "after:bg-mybrown2 after:h-[3px] after:left-0 after:w-full"
                  : "after:bg-gray-200 after:h-[5px] after:left-[50%] after:w-[5px]"
              }`}
            >
              تماس با ما
            </Link>
            <Link
              href={"/about-us"}
              className={`after:content-[''] hover:after:bg-mybrown2 after:absolute hover:after:h-[3px] hover:after:w-full hover:after:left-0 after:rounded-xl cursor-pointer after:transition-all after:-bottom-3 relative ${
                pathName === "/about-us"
                  ? "after:bg-mybrown2 after:h-[3px] after:left-0 after:w-full"
                  : "after:bg-gray-200 after:h-[5px] after:left-[50%] after:w-[5px]"
              }`}
            >
              درباره ما
            </Link>
            <Link
              href={"/about-site"}
              className={`after:content-[''] hover:after:bg-mybrown2 after:absolute hover:after:h-[3px] hover:after:w-full hover:after:left-0 after:rounded-xl cursor-pointer after:transition-all after:-bottom-3 relative ${
                pathName === "/about-site"
                  ? "after:bg-mybrown2 after:h-[3px] after:left-0 after:w-full"
                  : "after:bg-gray-200 after:h-[5px] after:left-[50%] after:w-[5px]"
              }`}
            >
              درباره سایت
            </Link>
          </div>
          {loading ? (
            <div className="flex items-center gap-3 h-[50px]">
              <span className="bg-gray-200 h-full aspect-square rounded-lg animate-pulse sm:block hidden"></span>
              <span className="bg-gray-200 h-full aspect-square rounded-lg animate-pulse"></span>
              <span className="bg-gray-200 w-[150px] h-full rounded-lg bg-zinc-800 animate-pulse lg:block hidden"></span>
            </div>
          ) : (
            <div className="flex items-center text-sm gap-3 sm:h-[50px] h-[40px]">
              {theUser && (
                <Link
                  href={"/p-user/wishlist"}
                  className="bg-gray-100 relative text-zinc-800 moraba-bold rounded-lg aspect-square items-center justify-center h-full sm:flex hidden hover:bg-zinc-200 transition"
                >
                  <CiHeart className="text-3xl" />
                  <span className="bg-mybrown2 rounded-full text-sm text-white w-[25px] block aspect-square moraba-bold flex items-center justify-center absolute -top-2 -right-2">
                    {wishLength}
                  </span>
                </Link>
              )}
              <Link
                href={"/cart"}
                className="bg-zinc-100 aspect-square flex items-center justify-center relative text-zinc-800 moraba-bold rounded-lg h-full hover:bg-zinc-200 transition"
              >
                <PiShoppingCartSimpleLight className="sm:text-3xl text-2xl" />
                <span className="bg-mybrown2 rounded-full sm:text-sm text-xs text-white sm:w-[25px] w-[15px] block aspect-square moraba-bold flex items-center justify-center absolute -top-2 -right-2">
                  {userCart.length}
                </span>
              </Link>
              {!theUser ? (
                <Link
                  href={"/auth/login"}
                  className={`bg-zinc-800 relative text-white moraba-bold shadow-xl shadow-zinc-600 ${
                    isNavTop ? "px-0 aspect-square" : "px-4"
                  } items-center justify-center rounded-lg h-full lg:flex hidden items-center gap-2 hover:bg-zinc-900 transition`}
                >
                  <span className={`${isNavTop ? "hidden" : "block"}`}>
                    ورود | عضویت
                  </span>
                  <CgProfile
                    className={`${isNavTop ? "text-3xl" : "text-2xl"}`}
                  />
                </Link>
              ) : (
                <ProfileSection
                  isProfileOpen={isProfileOpen}
                  isNavTop={isNavTop}
                  theUser={theUser}
                  setIsProfileOpen={setIsProfileOpen}
                />
              )}
            </div>
          )}
        </div>
      </nav>
      <MobileMenu
        CloseMenu={CloseMenu}
        isNavOpen={isNavOpen}
        pathName={pathName}
        theUser={theUser}
      />
      {children}
    </HeaderContext.Provider>
  );
  function OpenMenu() {
    setIsNavOpen(true);
  }
  function CloseMenu() {
    setIsNavOpen(false);
  }
}
