import AOSInit from "@/components/template/AOSinit";
import ScrollToTopBtn from "@/components/module/scrolltotop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/context/context";
import "@/style/globals.css";

export const metadata = {
  title: "SET Coffee | فروشگاه اینترنتی قهوه ست",
  description: "remake set-coffee website with next.js",
  icons: {
    icon: "/img/fav-icon/R.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body dir="rtl" className="bg-zinc-100 select-none overflow-x-hidden">
        <ScrollToTopBtn />
        <AOSInit />
        <UserProvider>{children}</UserProvider>
        <ToastContainer stacked />
      </body>
    </html>
  );
}
