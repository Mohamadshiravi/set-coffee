import { useEffect, useState } from "react";
import ImgInputRealTime from "../input-img";
import { IoCloseCircleOutline, IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { newToast } from "@/utils/helper-function";

export default function EditAdminProduct({ product, CloseModal }) {
  const [titleInp, setTitleInp] = useState("");
  const [priceInp, setPriceInp] = useState("");
  const [shortDesInp, setShortDesInp] = useState("");
  const [longDesInp, setLongDesInp] = useState("");
  const [weightInp, setWeightInp] = useState("");
  const [smellInp, setSmellInp] = useState("");
  const [suitableForInp, setSuitableForInp] = useState("");
  const [tagInp, setTagInp] = useState("");
  const [tags, setTags] = useState([]);

  const [imgInp, setImgInp] = useState([]);
  const [imgInpLength, setImgInpLength] = useState(1);

  const [isImgInpOpen, setIsImgInpOpen] = useState(false);

  useEffect(() => {
    setTitleInp(product.title);
    setPriceInp(product.price);
    setShortDesInp(product.shortDes);
    setLongDesInp(product.longDes);
    setSmellInp(product.smell);
    setWeightInp(product.weight);
    setSuitableForInp(product.suitableFor);
    setTags(product.tags.split(","));
  }, []);

  return (
    <section className="fixed z-50 top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-xs overflow-y-scroll sm:px-10 px-3 sm:py-20 py-6">
      <div className="text-zinc-700 bg-gray-50 p-4 rounded-lg sahdow-lg moraba-regular">
        <span
          onClick={CloseModal}
          className="text-6xl mt-0 mb-6 block text-zinc-700 hover:text-zinc-400 cursor-pointer transition-all"
        >
          <IoCloseCircleOutline />
        </span>
        <div className="grid md:grid-cols-[6fr_6fr] grid-cols-[1fr] gap-4 border-b pb-8">
          <div className="flex flex-col gap-2">
            <label className="text-lg">عنوان محصول</label>
            <input
              value={titleInp}
              onChange={(e) => setTitleInp(e.target.value)}
              type="text"
              className="outline-hidden border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg"> قیمت محصول (به تومان)</label>
            <input
              value={priceInp}
              onChange={(e) => setPriceInp(e.target.value)}
              dir="ltr"
              type="number"
              className="outline-hidden border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">توضیحات کوتاه</label>
            <textarea
              value={shortDesInp}
              onChange={(e) => setShortDesInp(e.target.value)}
              className="outline-hidden h-[300px] border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">توضیحات بلند</label>
            <textarea
              value={longDesInp}
              onChange={(e) => setLongDesInp(e.target.value)}
              className="outline-hidden h-[300px] border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">وزن محصول (به کیلوگرم)</label>
            <input
              value={weightInp}
              onChange={(e) => setWeightInp(e.target.value)}
              dir="ltr"
              type="number"
              className="outline-hidden border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">قابل مصرف برای :</label>
            <input
              value={suitableForInp}
              onChange={(e) => setSuitableForInp(e.target.value)}
              type="text"
              className="outline-hidden border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">میزان بو</label>
            <select
              value={smellInp}
              onChange={(e) => setSmellInp(e.target.value)}
              className="outline-hidden border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
            >
              <option value={"انتخاب نشده"}>انتخاب کنید</option>
              <option value={"متوسط به بالا ( FULL CITY )"}>
                متوسط به بالا ( FULL CITY )
              </option>
              <option value={"مایل"}>مایل</option>
              <option value={"کم"}>کم</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">تگ های محصول (بنویس اینتر بزن)</label>
            <input
              onChange={(e) => setTagInp(e.target.value)}
              onKeyUp={AddTagsHandler}
              value={tagInp}
              type="text"
              className="outline-hidden border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
            />
            <div className="w-full flex items-center flex-wrap gap-3">
              {tags.map((e, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-zinc-300 border border-zinc-700 text-zinc-700 border-dashed pr-3 pl-4 py-1 rounded-lg"
                >
                  <IoCloseOutline
                    onClick={() => DeleteTagHandler(e)}
                    className="hover:bg-gray-100 transition cursor-pointer text-xl rounded-full"
                  />
                  <span>{e}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">عکس های محصول</label>
            {isImgInpOpen ? (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: imgInpLength }).map((e, i) => (
                  <ImgInputRealTime key={i} GetValueHandler={GetValueHandler} />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {product.images.map((e, i) => (
                  <img
                    key={i}
                    src={e}
                    className="w-[200px] aspect-square border rounded-lg"
                  />
                ))}
                <div className="w-[200px] aspect-square text-lg text-zinc-600 border rounded-lg flex items-center justify-center bg-zinc-200 border-2 border-zinc-600 border-dashed">
                  <button
                    onClick={() => {
                      setIsImgInpOpen(true);
                    }}
                    className="bg-zinc-400 rounded-lg px-2 py-1 border-zinc-600 border hover:bg-zinc-500 transition"
                  >
                    تغییر تمام عکس ها
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={EditProductHandler}
          className="bg-green-600 mt-6 hover:bg-green-700 transition text-white px-10 py-4 rounded-lg text-xl font-bold"
        >
          به روزرسانی
        </button>
      </div>
    </section>
  );
  async function EditProductHandler() {
    const formData = new FormData();

    formData.append("title", titleInp);
    formData.append("price", priceInp);
    formData.append("shortDes", shortDesInp);
    formData.append("longDes", longDesInp);
    formData.append("weight", weightInp);
    formData.append("smell", smellInp);
    formData.append("tags", tags);
    formData.append("suitableFor", suitableForInp);
    formData.append("imagesLength", imgInp.length);

    imgInp.map((e, i) => {
      formData.append(`img${i}`, e);
    });

    const res = await axios.put(`/api/product/${product._id}`, formData);
    if (res.status === 200) {
      newToast("محصول با موفقیت بروز شد");
      setInterval((e) => location.reload(), 1500);
    }
  }
  function AddTagsHandler(e) {
    let allTags = tags;
    if (e.keyCode === 13) {
      allTags.push(tagInp);
      setTags(allTags);
      setTagInp("");
    }
  }
  function DeleteTagHandler(text) {
    let newAllTags = tags.filter((e) => e !== text);
    setTags(newAllTags);
  }
  function GetValueHandler(img) {
    setImgInpLength(imgInpLength + 1);

    const allProductImg = imgInp;
    allProductImg.push(img);
    setImgInp(allProductImg);
  }
}
