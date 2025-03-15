import AdminHeader from "@/components/template/p-admin/admin-header";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import { redirect } from "next/navigation";

export default async function AdminPanelLayout({ children }) {
  const theUser = await isUserLogedIn();

  const userAdmin = await IsUserAdmin();
  if (!userAdmin) {
    return redirect("/");
  }
  return (
    <>
      {/* <AdminHeader theUser={JSON.parse(JSON.stringify(theUser))} />
      <main className="w-full bg-zinc-100 border">{children}</main> */}
      <h1>rebuilding website</h1>
    </>
  );
}
