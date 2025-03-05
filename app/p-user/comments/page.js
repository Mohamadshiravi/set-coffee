import DashboardComment from "@/components/template/p-user/comment";
import commentModel from "@/models/comment";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import ConnectTODb from "@/utils/connecttodb";

export default async function UserCommentpage() {
  const theUser = await isUserLogedIn();

  await ConnectTODb();
  const userComments = await commentModel
    .find({ user: theUser._id }, "-__v")
    .populate("product", "title")
    .populate("user", "username avatar");

  return (
    <>
      <div className="p-6">
        <div className="flex flex-col sm:gap-4 gap-20 shabnam p-4 sm:pt-4 pt-20 rounded-lg ">
          {userComments.map((e, i) => (
            <DashboardComment
              key={i}
              body={e.body}
              score={e.score}
              username={e.user.username}
              avatar={e.user.avatar}
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
