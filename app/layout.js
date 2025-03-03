import ScrollToTopBtn from "@/components/module/scrolltotop";
import { UserProvider } from "@/context/context";
import "@/style/globals.css";
import Navbar from "@/components/module/header-nav/navbar";
import MuiThemeProvider from "@/components/module/muiThemeProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "SET Coffee | فروشگاه اینترنتی قهوه ست",
  description: "remake set-coffee website with next.js",
  icons: {
    icon: "/img/fav-icon/R.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className="select-none overflow-x-hidden moraba-regular text-zinc-800 bg-stone-200 max-w-[2000px]">
        <MuiThemeProvider>
          <ScrollToTopBtn />
          <UserProvider>
            {children}
            <Navbar />
          </UserProvider>
          <Toaster />
        </MuiThemeProvider>
      </body>
    </html>
  );
}
