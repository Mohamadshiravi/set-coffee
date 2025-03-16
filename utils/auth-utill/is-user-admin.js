import userModel from "@/models/user";
import isUserLogedIn from "./is-user-login";

export default async function IsUserAdmin() {
  const theuserDetails = await isUserLogedIn();
  if (theuserDetails) {
    const theUser = await userModel.findOne(
      { phone: theuserDetails.phone },
      "-_id role"
    );
    if (theUser.role === "USER") {
      return false;
    } else if (theUser.role === "ADMIN") {
      return true;
    }
  } else {
    return false;
  }
}
