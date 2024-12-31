import path from "path";
import fs from "fs";

export default async function DeletePhoto(input) {
  const CuttedPath = input.split("/");
  const CuttedPathLength = CuttedPath.length - 1;

  const imgPath = path.join(
    process.cwd(),
    "/public/uploads/product-photo/" + CuttedPath[CuttedPathLength]
  );
  fs.unlinkSync(imgPath);
}
