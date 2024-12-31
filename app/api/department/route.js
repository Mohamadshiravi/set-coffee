import departmentModel from "@/models/department";
import IsUserAdmin from "@/utils/auth-utill/is-user-admin";
import ConnectTODb from "@/utils/connecttodb";

export async function POST(req) {
  const theUser = await IsUserAdmin();

  if (!theUser) {
    return Response.json({ message: "forbidden" }, { status: 403 });
  }

  const { name } = await req.json();

  ConnectTODb();

  try {
    await departmentModel.create({
      name,
    });
    return Response.json({ message: "created" }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "not created" }, { status: 500 });
  }
}
