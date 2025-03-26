import * as yup from "yup";

export default async function ValidateProductObj(data) {
  const schema = yup.object({
    title: yup.string().required("عنوان را وارد کنید"),
    price: yup.string().required("قیمت را وارد کنید"),
    shortDes: yup.string().required("توضیحات کوتاه را وارد کنید"),
    longDes: yup.string().required("توضیحات بلند را وارد کنید"),
    weight: yup.string().required("وزن را وارد کنید"),
    smell: yup.string().required("میزا بو را وارد کنید"),
    suitableFor: yup.string().required("قابل مصرف برای  را وارد کنید"),
  });

  const res = await schema.validate(data);
  return res;
}
