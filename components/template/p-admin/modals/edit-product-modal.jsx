import { useState } from "react";
import ImgInputRealTime from "../input-img";
import { IoCloseCircleOutline, IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { newErrorToast, newSucToast, newToast } from "@/utils/helper-function";
import { useFormik } from "formik";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import ValidateProductObj from "@/utils/productValidator";

export default function EditAdminProduct({ product, CloseModal, reRender }) {
  const [tagInp, setTagInp] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: product.title,
      price: product.price,
      shortDes: product.shortDes,
      longDes: product.longDes,
      weight: product.weight,
      smell: product.smell,
      tags: product.tags?.split(","),
      suitableFor: product.suitableFor,
    },
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      try {
        setLoading(true);

        const isDataVaild = await ValidateProductObj(values);
        const res = await axios.put(`/api/product/${product._id}`, values);

        newSucToast("محصول با موفقیت بروز شد");
        reRender();
        setLoading(false);
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
    <section className="fixed z-50 top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-xs overflow-y-scroll sm:p-10 p-3">
      <div className="text-zinc-700 bg-gray-50 p-4 rounded-lg sahdow-lg moraba-regular">
        <span className="mt-0 mb-4 block">
          <IoCloseCircleOutline
            className="sm:text-6xl text-5xl text-zinc-700 hover:text-zinc-400 cursor-pointer transition-all"
            onClick={CloseModal}
          />
        </span>
        <div className="grid md:grid-cols-[6fr_6fr] grid-cols-[1fr] gap-4 border-b pb-8">
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
            <MenuItem value={""}>انتخاب کنید</MenuItem>
            <MenuItem value={"متوسط به بالا ( FULL CITY )"}>
              متوسط به بالا ( FULL CITY )
            </MenuItem>
            <MenuItem value={"مایل"}>مایل</MenuItem>
            <MenuItem value={"کم"}>کم</MenuItem>
          </Select>
          <div className="flex flex-col gap-2">
            <TextField
              label="تگ های محصول (بنویس اینتر بزن)"
              name="tagsInp"
              onChange={(e) => setTagInp(e.target.value)}
              onKeyUp={(e) => AddTagsHandler(e)}
              value={tagInp}
              type="text"
            />
            <div className="w-full flex items-center flex-wrap gap-3">
              {formik.values.tags?.map((e, i) => (
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
              {product.images.map((e, i) => (
                <img
                  key={i}
                  src={e}
                  className="w-[200px] aspect-square border rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="border mt-4 sm:w-[300px] w-full m-auto">
          <Button
            fullWidth
            onClick={formik.handleSubmit}
            loading={loading}
            color="success"
            variant="contained"
            size="large"
          >
            به روز رسانی
          </Button>
        </div>
      </div>
    </section>
  );

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
