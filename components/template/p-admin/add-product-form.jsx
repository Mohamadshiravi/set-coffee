"use client";

import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ImgInputRealTime from "./input-img";
import axios from "axios";
import { newErrorToast, newToast } from "@/utils/helper-function";

export default function AddProductForm() {
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

  return (
    <div className="text-zinc-700 mt-10">
      <div className="grid md:grid-cols-[6fr_6fr] grid-cols-[1fr] gap-4 border-b pb-8">
        <div className="flex flex-col gap-2">
          <label className="text-lg">عنوان محصول</label>
          <input
            value={titleInp}
            onChange={(e) => setTitleInp(e.target.value)}
            type="text"
            className="outline-none border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg"> قیمت محصول (به تومان)</label>
          <input
            value={priceInp}
            onChange={(e) => setPriceInp(e.target.value)}
            dir="ltr"
            type="number"
            className="outline-none border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">توضیحات کوتاه</label>
          <textarea
            value={shortDesInp}
            onChange={(e) => setShortDesInp(e.target.value)}
            className="outline-none h-[300px] border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">توضیحات بلند</label>
          <textarea
            value={longDesInp}
            onChange={(e) => setLongDesInp(e.target.value)}
            className="outline-none h-[300px] border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">وزن محصول (به کیلوگرم)</label>
          <input
            value={weightInp}
            onChange={(e) => setWeightInp(e.target.value)}
            dir="ltr"
            type="number"
            className="outline-none border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">قابل مصرف برای :</label>
          <input
            value={suitableForInp}
            onChange={(e) => setSuitableForInp(e.target.value)}
            type="text"
            className="outline-none border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">میزان بو</label>
          <select
            value={smellInp}
            onChange={(e) => setSmellInp(e.target.value)}
            className="outline-none border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
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
            className="outline-none border border-zinc-300 py-3 px-4 rounded-md focus:border-zinc-600 transition focus:ring-2 ring-zinc-300"
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
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: imgInpLength }).map((e, i) => (
              <ImgInputRealTime key={i} GetValueHandler={GetValueHandler} />
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={AddProductsHandler}
        className="bg-green-600 mt-6 hover:bg-green-700 transition text-white px-10 py-4 rounded-lg text-xl font-bold"
      >
        افزودن
      </button>
    </div>
  );
  async function AddProductsHandler(e) {
    e.preventDefault();
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

    try {
      const res = await axios.post("/api/product", formData);
      if (res.status === 201) {
        newToast("محصول جدید اضافه شد");
        setInterval((e) => location.reload(), 1500);
      }
    } catch (error) {
      newErrorToast(
        "لطفا تمام فیلد ها را پر کنید و یک عکس برای محصول انتخاب کنید"
      );
    }
  }
  function GetValueHandler(img) {
    setImgInpLength(imgInpLength + 1);

    const allProductImg = imgInp;
    allProductImg.push(img);
    setImgInp(allProductImg);
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
}
