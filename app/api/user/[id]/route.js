import commentModel from "@/models/comment";
import tiketModel from "@/models/tiket";
import userModel from "@/models/user";
import wishlistModel from "@/models/wishlist";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";

export async function DELETE(req, props) {
  const params = await props.params;
  const isUser = await IsUserAdmin();
  if (!isUser) {
    return Response.json({ message: "You have not access" }, { status: 403 });
  }
  try {
    await userModel.findOneAndDelete({ _id: params.id });
    await wishlistModel.deleteMany({ user: params.id });
    await commentModel.deleteMany({ user: params.id });
    await tiketModel.deleteMany({ user: params.id });
    return Response.json(
      { message: "user deleted" },
      {
        status: 200,
      }
    );
  } catch (e) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
}
