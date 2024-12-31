import discountModel from "@/models/discount";

export async function POST(req) {
  const { code } = await req.json();

  const isCodeExist = await discountModel.findOne({ code });
  if (!isCodeExist) {
    return Response.json({ message: "code not found" }, { status: 404 });
  }
  await discountModel.findOneAndUpdate({ code }, { $inc: { use: 1 } });
  if (isCodeExist.use >= isCodeExist.maxUse) {
    return Response.json({ message: "code is not motabar" }, { status: 422 });
  }
  return Response.json({ data: isCodeExist }, { status: 200 });
}
