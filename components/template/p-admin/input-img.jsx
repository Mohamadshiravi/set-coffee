import { newErrorToast, newSucToast } from "@/utils/helper-function";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa";

const ImgInputRealTime = React.memo(
  ({ GetLengthHandler, setProductId, productId, resetImgInputs }) => {
    const imgPreview = useRef();
    const [imgSrc, setImgSrc] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (resetImgInputs) {
        setImgSrc("");
      }
    }, [resetImgInputs]);
    return (
      <>
        {imgSrc === "" ? (
          <label className="bg-gray-200 w-[200px] aspect-square border-2 cursor-pointer border-dashed border-zinc-600 py-10 rounded-lg flex items-center justify-center flex-col gap-3 text-xl">
            <input
              onChange={UploadImg}
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
            {loading && (
              <div className="w-full flex flex-col gap-2 items-center justify-center text-white h-full absolute top-0 left-0 rounded-lg z-10 bg-black/80 transition-all">
                در حال اپلود
                <span className="block border-t-2 w-[30px] aspect-square rounded-full animate-spin"></span>
              </div>
            )}
          </div>
        )}
      </>
    );
    async function UploadImg(e) {
      const img = e.target.files[0];

      if (img) {
        try {
          setLoading(true);

          //show preview
          const imgReader = new FileReader();
          imgReader.readAsDataURL(img);
          imgReader.onload = (e) => {
            setImgSrc(e.target.result);
          };

          //upload photo
          const formdata = new FormData();
          formdata.append("img", img);
          formdata.append("productId", productId);
          const res = await axios.post("/api/product/photo", formdata);

          setProductId(res.data.productId);
          GetLengthHandler();
          setLoading(false);
          newSucToast("عکس اپلود شد");
        } catch (error) {
          newErrorToast("عکس اپلود نشد");
          setLoading(false);
          setImgSrc("");
        }
      }
    }
  }
);
export default ImgInputRealTime;
