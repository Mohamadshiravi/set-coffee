import userModel from "@/models/user";
import { CheckHashPass } from "@/utils/auth-utill/hashedpasscontrol";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import { JenerateAccessToken } from "@/utils/auth-utill/tokencontrol";
import ConnectTODb from "@/utils/connecttodb";

export async function PUT(req) {
  ConnectTODb();

  const { name, username, email, password } = await req.json();

  const theUser = await isUserLogedIn();

  const isPassValid = await CheckHashPass(password, theUser.password);
  if (!isPassValid) {
    return Response.json({ message: "pass is invalid" }, { status: 401 });
  }

  try {
    await userModel.findOneAndUpdate(
      { email: theUser.email },
      {
        name,
        username,
        email,
      }
    );
    const newToken = await JenerateAccessToken({ email });
    return Response.json(
      { message: "user updated" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${newToken};path=/;httpOnly=true;maxAge=60*60*48`,
        },
      }
    );
  } catch (e) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
}
