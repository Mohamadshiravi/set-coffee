import tiketModel from "@/models/tiket";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";
import ConnectTODb from "@/utils/connecttodb";

export async function POST(req) {
  await ConnectTODb();

  const theUser = await isUserLogedIn();
  if (!theUser) {
    return Response.json({ message: "user unauthorize" }, { status: 401 });
  }

  const { title, body, department, priority, isAnswer, answerFor, isClosed } =
    await req.json();

  try {
    const newTiket = await tiketModel.create({
      title,
      body,
      department,
      priority,
      user: theUser._id,
      isAnswer,
      answerFor,
      isClosed,
    });
    if (isAnswer) {
      await tiketModel.findOneAndUpdate(
        { _id: answerFor },
        {
          isClosed: true,
          answer: newTiket._id,
        }
      );
    }
    return Response.json({ message: "tiket created" }, { status: 201 });
  } catch (e) {
    return Response.json({ message: "tiket not created" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const isUserAdmin = await IsUserAdmin();
    if (!isUserAdmin) {
      return Response.json({ message: "You have not access" }, { status: 403 });
    }

    const allTikets = await tiketModel
      .find({})
      .sort("-_id")
      .populate("department", "name")
      .populate("user", "username")
      .populate("answer", "body")
      .lean();
    return Response.json({ message: "all tiket", allTikets });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
