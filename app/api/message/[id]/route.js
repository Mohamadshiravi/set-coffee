import messageModel from "@/models/message";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";
import ConnectTODb from "@/utils/connecttodb";

export async function DELETE(req, { params }) {
  const isUserAdmin = await IsUserAdmin();
  if (!isUserAdmin) {
    return Response.json(
      { message: "you have not primision" },
      { status: 403 }
    );
  }
  ConnectTODb();

  try {
    await messageModel.findOneAndDelete({ _id: params.id });
    return Response.json({ message: "message deleted" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "message not deleted" }, { status: 500 });
  }
}
