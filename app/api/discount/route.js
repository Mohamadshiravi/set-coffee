import discountModel from "@/models/discount";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";
import ConnectTODb from "@/utils/connecttodb";

export async function POST(req) {
  const isUserAdmin = await IsUserAdmin();
  if (!isUserAdmin) {
    return Response.json(
      { message: "you have not primision" },
      { status: 403 }
    );
  }

  const { code, precent, maxUse } = await req.json();

  ConnectTODb();

  try {
    await discountModel.create({
      code,
      precent,
      maxUse,
    });
    return Response.json({ message: "discount created" }, { status: 201 });
  } catch (e) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
}
