import tiketModel from "@/models/tiket";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";
import ConnectTODb from "@/utils/connecttodb";

export async function DELETE(req, props) {
  const params = await props.params;
  await ConnectTODb();

  const isUser = await IsUserAdmin();
  if (!isUser) {
    return Response.json({ message: "user have not access" }, { status: 403 });
  }

  try {
    await tiketModel.findOneAndDelete({ _id: params.id });
    await tiketModel.findOneAndDelete({ answerFor: params.id });
    return Response.json({ message: "tiket deleted" }, { status: 200 });
  } catch (e) {
    return Response.json({ message: "error" }, { status: 500 });
  }
}
