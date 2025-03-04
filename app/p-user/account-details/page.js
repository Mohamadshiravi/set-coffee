import ChangeUserDetailsForm from "@/components/template/p-user/change-details-form";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";

export default async function AccountdetailsPage() {
  const theUser = await isUserLogedIn();

  return (
    <section className="w-full h-screen flex items-center justify-center p-6">
      <ChangeUserDetailsForm theUser={JSON.parse(JSON.stringify(theUser))} />
    </section>
  );
}
