import path from "path";
import { writeFileSync } from "fs";

export default async function UploadImage(img, name, SavePath) {
  const bufferedImg = Buffer.from(await img.arrayBuffer());
  const imgName = name + "-" + img.name;

  const imgPath = path.join(
    process.cwd(),
    `/public/uploads/${SavePath}/` + imgName
  );
  writeFileSync(imgPath, bufferedImg);

  return `/uploads/${SavePath}/` + imgName;
}
