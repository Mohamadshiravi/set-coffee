import { ValidateToken } from "@/utils/auth-utill/tokencontrol";
import { cookies } from "next/headers";
import userModel from "@/models/user";
import ConnectTODb from "../connecttodb";

export default async function isUserLogedIn() {
  const userToken = (await cookies()).get("token");
  if (userToken) {
    const IsTokenValid = ValidateToken(userToken.value);
    if (IsTokenValid) {
      await ConnectTODb();
      const theUser = await userModel.findOne(
        { phone: IsTokenValid.phone },
        "-__v"
      );
      return theUser;
    }
  }
  return null;
}
