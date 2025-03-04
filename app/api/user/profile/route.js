import commentModel from "@/models/comment";
import userModel from "@/models/user";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.CLOUD_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export async function POST(req) {
  const theUser = await isUserLogedIn();
  if (!theUser) {
    return Response.json({ message: "user unauthorize" }, { status: 401 });
  }

  const isUserHaveAvatar = await userModel.findOne(
    { _id: theUser._id },
    "imageId"
  );

  if (isUserHaveAvatar.imageId) {
    imagekit.deleteFile(isUserHaveAvatar.imageId);
  }

  try {
    const formData = await req.formData();
    const img = formData.get("img");

    const bufferedPhoto = Buffer.from(await img.arrayBuffer());
    const response = await imagekit.upload({
      file: bufferedPhoto,
      fileName: `avatar-${Date.now()}`,
      folder: "/setcoffee/avatar",
    });

    await userModel.findOneAndUpdate(
      { _id: theUser._id },
      {
        avatar: response.url,
        imageId: response.fileId,
      }
    );

    const allComment = await commentModel.find({});
    allComment.map(async (e, i) => {
      if (e.email === theUser.email) {
        await commentModel.findOneAndUpdate(
          { _id: e._id },
          { avatar: response.url }
        );
      }
    });

    return Response.json(
      { message: "user updated", url: response.url },
      {
        status: 200,
      }
    );
  } catch (e) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
}
