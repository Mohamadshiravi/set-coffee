import { useEffect, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export default function ImgInputRealTime({ GetValueHandler }) {
  const imgPreview = useRef();
  const [imgSrc, setImgSrc] = useState("");
  return (
    <>
      {imgSrc === "" ? (
        <label className="bg-gray-200 w-[200px] aspect-square border-2 cursor-pointer border-dashed border-zinc-600 py-10 rounded-lg flex items-center justify-center flex-col gap-3 text-xl">
          <input
            onChange={ShowImgUserSelected}
            type="file"
            className="w-0 h-0"
            accept=".jpg, .jpeg, .webp, .png"
          />
          <h3>انتخاب کنید</h3>
          <FaRegImage className="text-3xl" />
        </label>
      ) : (
        <div className="relative group border">
          <img
            ref={imgPreview}
            src={imgSrc}
            className="w-[200px] aspect-square rounded-lg object-cover"
          />
          <div className="w-full flex flex-col gap-2 items-center justify-center h-full absolute top-0 left-0 rounded-lg z-10 bg-black/50 transition-all opacity-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                imgPreview.current.requestFullscreen() ||
                  imgPreview.current.webkitRequestFullscreen();
              }}
              className="bg-blue-500 text-white rounded-md p-2 text-3xl hover:bg-blue-600 transition"
            >
              <FaEye />
            </button>
          </div>
        </div>
      )}
    </>
  );
  function ShowImgUserSelected(e) {
    GetValueHandler(e.target.files[0]);

    const imgReader = new FileReader();
    imgReader.readAsDataURL(e.target.files[0]);
    imgReader.onload = (e) => {
      setImgSrc(e.target.result);
    };
  }
}
