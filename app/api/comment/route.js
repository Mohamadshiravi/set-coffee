import commentModel from "@/models/comment";
import productModel from "@/models/product";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import ConnectTODb from "@/utils/connecttodb";

export async function POST(req) {
  await ConnectTODb();

  const { body, score, product } = await req.json();

  const theUser = await isUserLogedIn();
  if (!theUser) {
    return Response.json({ message: "User not login" }, { status: 401 });
  }

  try {
    // یافتن محصول قبل از افزودن کامنت
    const currentProduct = await productModel.findOne({ _id: product });
    console.log(currentProduct, product);

    if (!currentProduct) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    // ایجاد کامنت جدید
    await commentModel.create({
      user: theUser._id,
      body,
      score,
      product,
      queued: true,
    });

    return Response.json({ message: "comment added" }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "comment not added" }, { status: 500 });
  }
}
