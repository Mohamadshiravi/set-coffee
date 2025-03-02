import ScrollToTopBtn from "@/components/module/scrolltotop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <body className="bg-zinc-100 select-none overflow-x-hidden moraba-regular">
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
