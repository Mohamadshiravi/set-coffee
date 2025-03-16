import userModel from "@/models/user";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";

export async function GET(req) {
  try {
    const isUserAdmin = await IsUserAdmin();
    if (!isUserAdmin) {
      return Response.json({ message: "You have not access" }, { status: 403 });
    }

    const users = await userModel.find({}, "-__v");
    return Response.json({ message: "all users", users });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
