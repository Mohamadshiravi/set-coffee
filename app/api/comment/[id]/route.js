import commentModel from "@/models/comment";
import productModel from "@/models/product";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";
import ConnectTODb from "@/utils/connecttodb";

export async function PUT(req, props) {
  const params = await props.params;
  await ConnectTODb();

  const isUser = await IsUserAdmin();
  if (!isUser) {
    return Response.json({ message: "you have not access" }, { status: 403 });
  }

  try {
    const comment = await commentModel.findOne(
      { _id: params.id },
      "score product"
    );
    const product = await productModel.findOne(
      { _id: comment.product },
      "comments score"
    );

    const totalReviews = product.comments.length;
    let newProductScore = 0;

    if (totalReviews !== 0) {
      newProductScore =
        (product.score * (totalReviews - 1) + comment.score) / totalReviews;
    } else {
      newProductScore = comment.score;
    }

    await productModel.findOneAndUpdate(
      { _id: product._id },
      {
        score: newProductScore,
        $push: { comments: comment._id },
      }
    );
    await commentModel.findOneAndUpdate(
      { _id: comment._id },
      {
        queued: false,
      }
    );
    return Response.json({ message: "comment added" }, { status: 200 });
  } catch (e) {
    return Response.json({ message: "error" }, { status: 500 });
  }
}

export async function DELETE(req, props) {
  const params = await props.params;
  await ConnectTODb();

  const isUser = await IsUserAdmin();
  if (!isUser) {
    return Response.json({ message: "you have not access" }, { status: 403 });
  }

  try {
    const comment = await commentModel.findOne({ _id: params.id }, "product");
    const product = await productModel.findOne({ _id: comment.product }, "");

    await productModel.findOneAndUpdate(
      { _id: product._id },
      {
        $pull: { comments: comment._id },
      }
    );
    await commentModel.findOneAndDelete({ _id: params.id });

    return Response.json({ message: "comment deleted" }, { status: 200 });
  } catch (e) {
    return Response.json({ message: "error" }, { status: 500 });
  }
}
