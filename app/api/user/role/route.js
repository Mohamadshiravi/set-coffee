import userModel from "@/models/user";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";

export async function POST(req) {
  const isUser = await IsUserAdmin();
  if (!isUser) {
    return Response.json({ message: "You have not access" }, { status: 403 });
  }

  const { user, role } = await req.json();

  try {
    await userModel.findOneAndUpdate(
      { _id: user },
      {
        role,
      }
    );
    return Response.json({ message: "user change" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "user not change" }, { status: 500 });
  }
}
