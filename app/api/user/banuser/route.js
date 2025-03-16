import BanUserModel from "@/models/banuser";
import userModel from "@/models/user";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";

export async function POST(req) {
  const isUser = await IsUserAdmin();
  if (!isUser) {
    return Response.json({ message: "You have not access" }, { status: 403 });
  }

  const { phone, id } = await req.json();

  try {
    await BanUserModel.create({ phone });
    await userModel.findOneAndDelete({ _id: id });

    return Response.json({ message: "user banned" }, { status: 200 });
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

    const banUsers = await BanUserModel.find({}, "-__v");
    return Response.json({ message: "all ban users", banUsers });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
