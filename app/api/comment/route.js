import commentModel from "@/models/comment";
import productModel from "@/models/product";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import ConnectTODb from "@/utils/connecttodb";

export async function POST(req) {
  ConnectTODb();

  const { body, score, product } = await req.json();

  const theUser = await isUserLogedIn();
  if (!theUser) {
    return Response.json({ message: "User not login" }, { status: 401 });
  }
  try {
    const theComment = await commentModel.create({
      avatar: theUser.avatar,
      username: theUser.username,
      email: theUser.email,
      body,
      score,
      product,
      queued: true,
    });

    const currentProduct = await productModel.findOne({ _id: product });

    //product score
    const productScore =
      currentProduct.score === 0
        ? score
        : (currentProduct.score * currentProduct.comments.length + score) /
          (currentProduct.comments.length + 1);

    await productModel.findOneAndUpdate(
      { _id: product },
      {
        score: Math.floor(productScore),
      }
    );

    await productModel.findOneAndUpdate(
      { _id: product },
      {
        $push: { comments: theComment._id },
      }
    );
    return Response.json({ message: "comment added" }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "comment not added" }, { status: 500 });
  }
}
