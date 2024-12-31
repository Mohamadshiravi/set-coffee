import wishlistModel from "@/models/wishlist";
import ConnectTODb from "../connecttodb";

export default async function UserWish(userID) {
  if (userID) {
    await ConnectTODb();
    const userWish = await wishlistModel.find({ user: userID });
    return userWish;
  } else {
    return [];
  }
}
