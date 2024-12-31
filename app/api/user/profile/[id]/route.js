import userModel from "@/models/user";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import ConnectTODb from "@/utils/connecttodb";
import fs from "fs";
import path from "path";

export async function DELETE(req, { params }) {
  await ConnectTODb();

  const theUser = await isUserLogedIn();
  if (!isUserLogedIn) {
    return Response.json({ message: "user unauthorize" }, { status: 401 });
  }

  try {
    const CuttedPath = theUser.avatar.split("/");
    const CuttedPathLength = CuttedPath.length - 1;

    const imgPath = path.join(
      process.cwd(),
      "/public/uploads/user-avatar/" + CuttedPath[CuttedPathLength]
    );
    fs.unlinkSync(imgPath);

    await userModel.findOneAndUpdate({ _id: theUser._id }, { avatar: "" });
    return Response.json({ message: "photo deleted" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
}
