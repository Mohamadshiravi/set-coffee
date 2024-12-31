import DashboardComment from "@/components/template/p-user/comment";
import commentModel from "@/models/comment";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import ConnectTODb from "@/utils/connecttodb";

export default async function UserCommentpage() {
  const theUser = await isUserLogedIn();

  ConnectTODb();
  const userComments = await commentModel
    .find({ email: theUser.email }, "-__v")
    .populate("product", "title");

  return (
    <>
      <h2 className="lg:text-center text-left lg:border-none w-full lg:text-3xl text-xl text-headcolor mt-3 pl-4 moraba-bold py-8 border-b-2 border-zinc-300">
        کامنت های شما
      </h2>
      <div className="p-6">
        <div className="bg-gray-100 flex flex-col sm:gap-4 gap-20 shabnam p-4 rounded-lg">
          {userComments.map((e, i) => (
            <DashboardComment
              key={i}
              body={e.body}
              score={e.score}
              username={e.username}
              date={e.date}
              queued={e.queued}
              productID={e.product._id}
              productTitle={e.product.title}
            />
          ))}
          {userComments.length === 0 && (
            <h3 className="moraba-regular text-center text-2xl w-full py-10">
              شما هنوز کامنتی نگذاشته اید
            </h3>
          )}
        </div>
      </div>
    </>
  );
}
