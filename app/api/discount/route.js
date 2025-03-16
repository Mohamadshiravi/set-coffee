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

  await ConnectTODb();

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

export async function GET(req) {
  try {
    const isUserAdmin = await IsUserAdmin();
    if (!isUserAdmin) {
      return Response.json({ message: "You have not access" }, { status: 403 });
    }

    const allDiscount = await discountModel.find({});
    return Response.json({ message: "allDiscount", allDiscount });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
