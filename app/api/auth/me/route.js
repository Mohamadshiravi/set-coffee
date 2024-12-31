import userModel from "@/models/user";
import wishlistModel from "@/models/wishlist";
import { ValidateToken } from "@/utils/auth-utill/tokencontrol";
import ConnectTODb from "@/utils/connecttodb";
import { cookies } from "next/headers";

export async function GET(req) {
  const userToken = cookies().get("token");
  if (userToken) {
    const IsTokenValid = await ValidateToken(userToken.value);
    if (IsTokenValid) {
      ConnectTODb();
      const theUser = await userModel.findOne(
        { email: IsTokenValid.email },
        "-__v"
      );

      if (!theUser) {
        return Response.json({ theUser: "user anAuth" }, { status: 401 });
      }

      const userWish = await wishlistModel.find({ user: theUser._id }, "_id");

      return Response.json(
        { theUser: theUser, wishLength: userWish.length },
        { status: 200 }
      );
    }
    return Response.json({ theUser: "user anAuth" }, { status: 401 });
  }
  return Response.json({ theUser: "user anAuth" }, { status: 401 });
}
