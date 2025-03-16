import DashboardMenu from "@/components/template/p-user/dashboard-menu";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const theUser = await isUserLogedIn();
  if (!theUser) {
    return redirect("/auth/login");
  }
  return (
    <main className="relative grid lg:grid-cols-[2.5fr_9.5fr] grid-cols-[1fr] min-h-[100dvh]">
      <DashboardMenu />
      <section className="w-full bg-white sm:mb-0 mb-12 ">{children}</section>
    </main>
  );
}
