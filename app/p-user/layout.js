import DashboardMenu from "@/components/template/p-user/dashboard-menu";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const theUser = await isUserLogedIn();
  if (!theUser) {
    return redirect("/");
  }
  return (
    <main className="relative grid lg:grid-cols-[2.5fr_9.5fr] grid-cols-[1fr]">
      <DashboardMenu theUser={JSON.parse(JSON.stringify(theUser))} />
      <section className="w-full bg-white sm:mb-0 mb-12">{children}</section>
    </main>
  );
}
