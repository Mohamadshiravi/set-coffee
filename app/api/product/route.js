import productModel from "@/models/product";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";
import ConnectTODb from "@/utils/connecttodb";
import UploadImage from "@/utils/upload-image";

export async function POST(req) {
  const isUserAdmin = await IsUserAdmin();
  if (!isUserAdmin) {
    return Response.json(
      { message: "you have not primision" },
      { status: 403 }
    );
  }

  const {
    title,
    price,
    shortDes,
    longDes,
    weight,
    smell,
    tags,
    suitableFor,
    productId,
  } = await req.json();

  const isProductCreated = await productModel.findOne(
    { _id: productId },
    "_id"
  );

  if (isProductCreated) {
    await productModel.findOneAndUpdate(
      { _id: isProductCreated._id },
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
  } else {
    await productModel.create({
      title,
      price,
      shortDes,
      longDes,
      tags: tags.join(","),
      weight,
      smell,
      suitableFor,
    });
  }

  try {
    return Response.json({ message: "product created" }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "product not created", error },
      { status: 500 }
    );
  }
}
export async function GET() {
  await ConnectTODb();

  try {
    const allProduct = await productModel.find({}, "-__v", {
      sort: "-_id",
    });
    return Response.json({ data: allProduct });
  } catch (error) {
    return Response.json({ data: "error" }, { status: 500 });
  }
}
