"use client";

import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ImgInputRealTime from "./input-img";
import axios from "axios";
import { newErrorToast, newSucToast, newToast } from "@/utils/helper-function";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import ValidateProductObj from "@/utils/productValidator";

export default function AddProductForm({ reRender }) {
  const [tagInp, setTagInp] = useState("");
  const [loading, setLoading] = useState(false);

  const [imgInpLength, setImgInpLength] = useState(1);

  const [productId, setProductId] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      shortDes: "",
      longDes: "",
      weight: "",
      smell: "",
      tags: [],
      suitableFor: "",
    },
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      try {
        setLoading(true);

        const isDataVaild = await ValidateProductObj(values);

        const res = await axios.post("/api/product", { ...values, productId });
        if (res.status === 201) {
          newSucToast("محصول جدید اضافه شد");
          reRender();
          formik.resetForm();
          setImgInpLength(1);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        if (e.errors[0]) {
          newErrorToast(e.errors[0]);
        } else {
          newErrorToast("مشکلی پیش امد");
        }
      }
    },
  });

  return (
    <form className="text-zinc-700 mt-10">
      <div className="grid md:grid-cols-[6fr_6fr] grid-cols-[1fr] gap-4">
        <TextField
          label="عنوان محصول"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
        />
        <TextField
          label="قیمت محصول (به تومان)"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          dir="ltr"
          type="number"
        />
        <TextField
          multiline
          label="توضیحات کوتاه"
          name="shortDes"
          value={formik.values.shortDes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextField
          multiline
          label="توضیحات بلند"
          name="longDes"
          value={formik.values.longDes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextField
          label="وزن محصول (به کیلوگرم)"
          name="weight"
          value={formik.values.weight}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          dir="ltr"
          type="number"
        />
        <TextField
          label="قابل مصرف برای :"
          name="suitableFor"
          value={formik.values.suitableFor}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
        />
        <Select
          name="smell"
          value={formik.values.smell}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          displayEmpty
        >
          <MenuItem value={""}>میزان بو</MenuItem>
          <MenuItem value={"متوسط به بالا ( FULL CITY )"}>
            متوسط به بالا ( FULL CITY )
          </MenuItem>
          <MenuItem value={"مایل"}>مایل</MenuItem>
          <MenuItem value={"کم"}>کم</MenuItem>
        </Select>
        <div className="flex flex-col gap-2 md:h-[50px]">
          <TextField
            label="تگ های محصول (بنویس اینتر بزن)"
            name="tagsInp"
            onChange={(e) => setTagInp(e.target.value)}
            onKeyUp={(e) => AddTagsHandler(e)}
            value={tagInp}
            type="text"
          />
          <div className="w-full flex items-center flex-wrap gap-3">
            {formik.values.tags.map((e, i) => (
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
              <ImgInputRealTime
                key={i}
                GetLengthHandler={GetLengthHandler}
                setProductId={setProductId}
                productId={productId}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 w-[200px]">
        <Button
          onClick={formik.handleSubmit}
          loading={loading}
          fullWidth
          color="success"
          variant="contained"
          size="large"
        >
          افزودن
        </Button>
      </div>
    </form>
  );

  function GetLengthHandler() {
    setImgInpLength(imgInpLength + 1);
  }
  function AddTagsHandler(e) {
    if (e.keyCode === 13) {
      e.stopPropagation();
      e.preventDefault();
      const newTags = [...formik.values.tags, tagInp.trim()];
      formik.setFieldValue("tags", newTags);
      setTagInp("");
    }
  }
  function DeleteTagHandler(text) {
    const newTags = formik.values.tags.filter((e) => e !== text);
    formik.setFieldValue("tags", newTags);
  }
}
