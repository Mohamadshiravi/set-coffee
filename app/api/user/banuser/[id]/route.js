import BanUserModel from "@/models/banuser";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";

export async function DELETE(req, props) {
  const params = await props.params;
  const isUser = await IsUserAdmin();
  if (!isUser) {
    return Response.json({ message: "You have not access" }, { status: 403 });
  }

  const { id } = params;

  try {
    await BanUserModel.findOneAndDelete({ _id: id });

    return Response.json({ message: "user unbanned" }, { status: 200 });
  } catch (e) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
}
