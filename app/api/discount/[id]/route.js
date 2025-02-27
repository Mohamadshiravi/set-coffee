import discountModel from "@/models/discount";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";
import ConnectTODb from "@/utils/connecttodb";

export async function POST(req, props) {
  const params = await props.params;
  const isUserAdmin = await IsUserAdmin();
  if (!isUserAdmin) {
    return Response.json(
      { message: "you have not primision" },
      { status: 403 }
    );
  }

  await ConnectTODb();

  try {
    await discountModel.findOneAndDelete({ _id: params.id });
    return Response.json({ message: "discount deleted" }, { status: 200 });
  } catch (e) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
}
