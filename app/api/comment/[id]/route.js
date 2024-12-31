import commentModel from "@/models/comment";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";
import ConnectTODb from "@/utils/connecttodb";

export async function PUT(req, { params }) {
  await ConnectTODb();

  const isUser = await IsUserAdmin();
  if (!isUser) {
    return Response.json({ message: "you have not access" }, { status: 403 });
  }

  try {
    await commentModel.findOneAndUpdate({ _id: params.id }, { queued: false });
    return Response.json({ message: "comment added" }, { status: 200 });
  } catch (e) {
    return Response.json({ message: "error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await ConnectTODb();

  const isUser = await IsUserAdmin();
  if (!isUser) {
    return Response.json({ message: "you have not access" }, { status: 403 });
  }

  try {
    await commentModel.findOneAndDelete({ _id: params.id });
    return Response.json({ message: "comment deleted" }, { status: 200 });
  } catch (e) {
    return Response.json({ message: "error" }, { status: 500 });
  }
}
