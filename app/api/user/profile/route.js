import commentModel from "@/models/comment";
import userModel from "@/models/user";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import ConnectTODb from "@/utils/connecttodb";
import UploadImage from "@/utils/upload-image";

export async function POST(req) {
  await ConnectTODb();

  const theUser = await isUserLogedIn();
  if (!isUserLogedIn) {
    return Response.json({ message: "user unauthorize" }, { status: 401 });
  }

  const formData = await req.formData();
  const img = formData.get("img");
  const user = formData.get("user");

  const UplodedImage = await UploadImage(img, Date.now(), "user-avatar");

  try {
    await userModel.findOneAndUpdate(
      { _id: user },
      {
        avatar: UplodedImage,
      }
    );
    const allComment = await commentModel.find({});
    allComment.map(async (e, i) => {
      if (e.email === theUser.email) {
        await commentModel.findOneAndUpdate(
          { _id: e._id },
          { avatar: UplodedImage }
        );
      }
    });

    return Response.json(
      { message: "user updated" },
      {
        status: 200,
      }
    );
  } catch (e) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
}
