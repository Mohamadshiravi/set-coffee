import otpModel from "@/models/otp";
import userModel from "@/models/user";
import { JenerateAccessToken } from "@/utils/auth-utill/tokencontrol";
import ConnectTODb from "@/utils/connecttodb";
import { cookies } from "next/headers";

export async function POST(req) {
  const { phone, name, username, code } = await req.json();

  await ConnectTODb();

  try {
    const isPhoneExist = await otpModel.findOne({ phone });

    if (!isPhoneExist) {
      return Response.json({ message: "phone not true" }, { status: 409 });
    }

    if (+isPhoneExist.code !== +code) {
      return Response.json({ message: "code not true" }, { status: 410 });
    }

    const DateNow = new Date().getTime();
    if (+DateNow > +isPhoneExist.expTime) {
      return Response.json({ message: "code Expired" }, { status: 410 });
    }

    await otpModel.findOneAndDelete({ _id: isPhoneExist._id });

    //jenerate Token and create user

    const isAdmin = await userModel.findOne({ role: "ADMIN" });
    await userModel.create({
      phone,
      name,
      username,
      role: isAdmin ? "USER" : "ADMIN",
    });
    const userToken = await JenerateAccessToken({ phone });

    await cookies().set({
      name: "token",
      value: userToken,
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return Response.json({ message: "userCreated" }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
