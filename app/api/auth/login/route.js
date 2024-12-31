import BanUserModel from "@/models/banuser";
import userModel from "@/models/user";
import { CheckHashPass } from "@/utils/auth-utill/hashedpasscontrol";
import { JenerateAccessToken } from "@/utils/auth-utill/tokencontrol";
import ConnectTODb from "@/utils/connecttodb";
import { cookies } from "next/headers";

export async function POST(req) {
  ConnectTODb();

  const { identifier, password } = await req.json();

  const isUserBan = await BanUserModel.findOne({ email: identifier });
  if (isUserBan) {
    return Response.json({ message: "user is Ban" }, { status: 403 });
  }

  const isUserExist = await userModel.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });
  if (!isUserExist) {
    return Response.json({ message: "user Not found" }, { status: 404 });
  }

  const isPassValid = await CheckHashPass(password, isUserExist.password);
  if (!isPassValid) {
    return Response.json({ message: "password is incorrect" }, { status: 401 });
  }

  const userToken = await JenerateAccessToken({ email: isUserExist.email });
  cookies().set({
    name: "token",
    value: userToken,
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 1000 * 24 * 10, // 10 day
  });
  return Response.json(
    { message: "You logedIn" },
    {
      status: 200,
    }
  );
}
