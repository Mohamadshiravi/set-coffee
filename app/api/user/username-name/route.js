import userModel from "@/models/user";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";
import ConnectTODb from "@/utils/connecttodb";

export async function POST(req) {
  ConnectTODb();

  const isUser = await IsUserAdmin();
  if (!isUser) {
    return Response.json({ message: "You have not access" }, { status: 403 });
  }

  const { name, username, user } = await req.json();

  try {
    await userModel.findOneAndUpdate(
      { _id: user },
      {
        name,
        username,
      }
    );
    return Response.json(
      { message: "user updated" },
      {
        status: 200,
      }
    );
  } catch (e) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
}
