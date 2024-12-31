import ChangeUserDetailsForm from "@/components/template/p-user/change-details-form";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";

export default async function AccountdetailsPage() {
  const theUser = await isUserLogedIn();

  return (
    <section className="">
      <h2 className="lg:text-center text-left lg:border-none w-full lg:text-3xl text-xl text-headcolor mt-3 pl-4 moraba-bold py-8 border-b-2 border-zinc-300">
        جزئیات حساب شما
      </h2>
      <div className="p-6">
        <ChangeUserDetailsForm theUser={JSON.parse(JSON.stringify(theUser))} />
      </div>
    </section>
  );
}
