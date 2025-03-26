import productModel from "@/models/product";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.CLOUD_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export async function POST(req) {
  const isUserAdmin = await IsUserAdmin();
  if (!isUserAdmin) {
    return Response.json({ message: "forbidden" }, { status: 403 });
  }

  try {
    const formdata = await req.formData();
    const img = formdata.get("img");
    const productId = formdata.get("productId");

    if (!img) {
      return Response.json({ error: "data is incorect" }, { status: 400 });
    }

    const bufferedPhoto = Buffer.from(await img.arrayBuffer());

    const response = await imagekit.upload({
      file: bufferedPhoto,
      fileName: `img-${Date.now()}`,
      folder: "/setcoffee/product",
    });

    if (productId === "") {
      const product = await productModel.create({
        imagesID: [response.fileId],
        images: [response.url],
      });

      return Response.json({
        message: "image uploaded",
        path: response.url,
        productId: product._id,
      });
    } else {
      const currentPost = await productModel.findOne({ _id: productId }, "_id");
      if (currentPost) {
        await productModel.findOneAndUpdate(
          { _id: currentPost._id },
          {
            $push: { imagesID: response.fileId, images: response.url },
          }
        );

        return Response.json({
          message: "image uploaded",
          path: response.url,
          productId: currentPost._id,
        });
      } else {
        const product = await productModel.create({
          imagesID: [response.fileId],
          images: [response.url],
        });
        return Response.json({
          message: "image uploaded",
          path: response.url,
          productId: product._id,
        });
      }
    }
  } catch (error) {
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
