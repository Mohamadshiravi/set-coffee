import commentModel from "@/models/comment";
import productModel from "@/models/product";
import wishlistModel from "@/models/wishlist";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";
import ConnectTODb from "@/utils/connecttodb";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.CLOUD_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export async function PUT(req, props) {
  const params = await props.params;
  const isUserAdmin = await IsUserAdmin();
  if (!isUserAdmin) {
    return Response.json(
      { message: "you have not primision" },
      { status: 403 }
    );
  }

  await ConnectTODb();

  const { title, price, shortDes, longDes, tags, weight, smell, suitableFor } =
    await req.json();

  try {
    await productModel.findOneAndUpdate(
      { _id: params.id },
      {
        title,
        price,
        shortDes,
        longDes,
        tags: tags.join(","),
        weight,
        smell,
        suitableFor,
      }
    );
    return Response.json({ message: "product Updated" }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "product not Updated", error },
      { status: 500 }
    );
  }
}
export async function DELETE(req, props) {
  const params = await props.params;
  const isUserAdmin = await IsUserAdmin();
  if (!isUserAdmin) {
    return Response.json(
      { message: "you have not primision" },
      { status: 403 }
    );
  }

  await ConnectTODb();

  const currentProduct = await productModel.findOne(
    {
      _id: params.id,
    },
    "imagesID"
  );

  try {
    if (currentProduct.imagesID.length !== 0) {
      currentProduct.imagesID.map(async (e) => {
        await imagekit.deleteFile(e);
      });
    }

    await productModel.findOneAndDelete({
      _id: params.id,
    });
    await commentModel.findOneAndDelete({
      product: params.id,
    });
    await wishlistModel.findOneAndDelete({
      product: params.id,
    });
    return Response.json("product deleted", { status: 200 });
  } catch (error) {
    return Response.json("product not deleted", { status: 500 });
  }
}
