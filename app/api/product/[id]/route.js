import commentModel from "@/models/comment";
import productModel from "@/models/product";
import wishlistModel from "@/models/wishlist";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";
import ConnectTODb from "@/utils/connecttodb";
import DeletePhoto from "@/utils/delete-photo";
import UploadImage from "@/utils/upload-image";
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

  const formData = await req.formData();

  const title = formData.get("title");
  const price = formData.get("price");
  const shortDes = formData.get("shortDes");
  const longDes = formData.get("longDes");
  const weight = formData.get("weight");
  const smell = formData.get("smell");
  const tags = formData.get("tags");
  const suitableFor = formData.get("suitableFor");
  const imagesLength = formData.get("imagesLength");

  let imagesArray = [];

  if (Number(imagesLength) >= 1) {
    const oldImages = await productModel.findOne(
      { _id: params.id },
      "images -_id"
    );
    oldImages.images.map(async (e) => {
      await DeletePhoto(e);
    });

    Array.from({ length: imagesLength }).map(async (e, i) => {
      const img = await formData.get(`img${i}`);
      await UploadImage(img, `${title}${i}`, "product-photo");
    });

    Array.from({ length: imagesLength }).map((e, i) => {
      const img = formData.get(`img${i}`);

      const imgName = `${title}${i}` + "-" + img.name;
      imagesArray.push(
        "http://localhost:3000/uploads/product-photo/" + imgName
      );
    });
  } else {
    const oldImagesArray = await productModel.findOne(
      { _id: params.id },
      "images"
    );
    imagesArray = oldImagesArray.images;
  }

  try {
    await productModel.findOneAndUpdate(
      { _id: params.id },
      {
        images: imagesArray,
        title,
        price,
        shortDes,
        longDes,
        tags,
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
