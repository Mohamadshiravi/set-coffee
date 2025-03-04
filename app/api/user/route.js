import userModel from "@/models/user";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import ConnectTODb from "@/utils/connecttodb";

export async function PUT(req) {
  await ConnectTODb();

  const { name, username } = await req.json();

  const theUser = await isUserLogedIn();
  if (!theUser) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    await userModel.findOneAndUpdate(
      { _id: theUser._id },
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
