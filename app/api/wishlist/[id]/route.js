import wishlistModel from "@/models/wishlist";
import ConnectTODb from "@/utils/connecttodb";

export async function DELETE(req, { params }) {
  await ConnectTODb();

  const deletedWish = await wishlistModel.findOneAndDelete({ _id: params.id });

  return Response.json({ message: "deleted" }, { status: 200 });
}
