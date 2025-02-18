import wishlistModel from "@/models/wishlist";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import ConnectTODb from "@/utils/connecttodb";

export async function POST(req) {
  await ConnectTODb();

  const { productID } = await req.json();
  const theUser = await isUserLogedIn();

  if (!theUser) {
    return Response.json({ message: "user unauthorized" }, { status: 401 });
  }

  const isUserHavedProduct = await wishlistModel.findOne({
    user: theUser._id,
    product: productID,
  });

  if (isUserHavedProduct) {
    return Response.json({ message: "user have the product" }, { status: 207 });
  }

  const createdWish = await wishlistModel.create({
    user: theUser._id,
    product: productID,
  });

  if (createdWish) {
    return Response.json({ message: "addedd" }, { status: 201 });
  }
}

export async function GET(req) {
  try {
    await ConnectTODb();

    const theUser = await isUserLogedIn();
    const userWish = await wishlistModel
      .find({ user: theUser._id })
      .populate("product", "title price score images");

    return Response.json({ message: "addedd", data: userWish });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
