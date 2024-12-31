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

  ConnectTODb();

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

  const imgRandomName = crypto.randomUUID();

  if (title && price && shortDes) {
    Array.from({ length: imagesLength }).map(async (e, i) => {
      const img = formData.get(`img${i}`);
      await UploadImage(img, `${imgRandomName}${i}`, "product-photo");
    });
  }

  Array.from({ length: imagesLength }).map((e, i) => {
    const img = formData.get(`img${i}`);

    const imgName = `${imgRandomName}${i}` + "-" + img.name;
    imagesArray.push("/uploads/product-photo/" + imgName);
  });

  try {
    await productModel.create({
      images: imagesArray,
      title,
      price,
      shortDes,
      longDes,
      tags,
      weight,
      smell,
      suitableFor,
    });
    return Response.json({ message: "product created" }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "product not created", error },
      { status: 500 }
    );
  }
}
export async function GET() {
  ConnectTODb();

  try {
    const allProduct = await productModel.find({}, null, { sort: "-_id" });
    return Response.json({ data: allProduct });
  } catch (error) {
    return Response.json({ data: "error" }, { status: 500 });
  }
}
