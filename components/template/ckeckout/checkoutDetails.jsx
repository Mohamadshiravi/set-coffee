"use client";

import { newErrorToast, newSucToast, newToast } from "@/utils/helper-function";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import allCountry from "@/utils/all-country";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/context/context";

const schema = yup.object({
  details: yup.string().required("توضیحاتی راجب سفارش خود بنویسید"),
  postCode: yup
    .string()
    .required("کد پستی را وارد کنید")
    .min(10, "کد پستی را کامل وارد کنید")
    .max(10, "کد پستی  را درست وارد کنید"),
  address: yup
    .string()
    .required("ادرس را وارد کنید")
    .min(5, "ادرس را کامل وارد کنید"),
  city: yup.string().required(" شهر را انتخاب کنید"),
  province: yup.string().required(" استان را انتخاب کنید"),
  lastname: yup
    .string()
    .required("نام خانوادگی را وارد کنید")
    .min(3, "نام خانوادگی را کامل وارد کنید"),
  firstname: yup
    .string()
    .required("نام را وارد کنید")
    .min(2, "نام را کامل وارد کنید"),
});

export default function CheckoutDetailsForm() {
  const router = useRouter();
  const { FetchUserCart } = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      province: "",
      city: "",
      address: "",
      postCode: "",
      details: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: async (values) => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      let reqBody = { ...values, cart };

      try {
        const res = await axios.post("/api/order", reqBody);
        newSucToast("سفارش شما با موفقیت ثبت شد");
        formik.resetForm();
        localStorage.removeItem("cart");
        FetchUserCart();
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } catch (error) {
        newErrorToast("هنگام ثبت سفارش مشکلی پیش امد");
      }
    },
  });

  return (
    <section className="flex flex-col items-center bg-stone-100 rounded-xs p-4 relative lg:order-0 order-1">
      <h2 className="moraba-bold text-xl">جزئیات صورتحساب</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-10 w-full flex flex-col gap-4"
      >
        <div className="flex items-center sm:flex-row flex-col gap-4">
          <TextField
            error={formik.errors.firstname && true}
            helperText={`${formik.errors.firstname || ""}`}
            name="firstname"
            label="نام"
            fullWidth
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            error={formik.errors.lastname && true}
            helperText={`${formik.errors.lastname || ""}`}
            name="lastname"
            label="نام خانوادگی"
            fullWidth
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Select
            error={formik.errors.province && true}
            fullWidth
            name="province"
            value={formik.values.province}
            onChange={(event) => {
              formik.setFieldValue("province", event.target.value);
            }}
            onBlur={formik.handleBlur}
            displayEmpty
          >
            <MenuItem value="" disabled sx={{ color: "#aaa" }}>
              استان خود را انتخاب کنید
            </MenuItem>
            {allCountry.map((e, i) => (
              <MenuItem key={i} value={e.label}>
                {e.label}
              </MenuItem>
            ))}
          </Select>
          <Select
            error={formik.errors.city && true}
            fullWidth
            name="city"
            value={formik.values.city}
            onChange={(event) => {
              formik.setFieldValue("city", event.target.value);
            }}
            onBlur={formik.handleBlur}
            displayEmpty
          >
            {formik.values.province === "" ? (
              <MenuItem value="" disabled sx={{ color: "#aaa" }}>
                ابتدا استان را انتخاب کنید
              </MenuItem>
            ) : (
              <MenuItem value="" disabled sx={{ color: "#aaa" }}>
                شهر خود را انتخاب کنید
              </MenuItem>
            )}

            {formik.values.province !== "" &&
              allCountry
                .filter((e) => e.label === formik.values.province)[0]
                .value.map((e, i) => (
                  <MenuItem key={i} value={e}>
                    {e}
                  </MenuItem>
                ))}
          </Select>
          <TextField
            error={formik.errors.address && true}
            helperText={`${formik.errors.address || ""}`}
            name="address"
            label="ادرس"
            fullWidth
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            multiline
          />
          <TextField
            error={formik.errors.postCode && true}
            helperText={`${formik.errors.postCode || ""}`}
            type="number"
            name="postCode"
            label="کد پستی"
            fullWidth
            value={formik.values.postCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            error={formik.errors.details && true}
            helperText={`${formik.errors.details || ""}`}
            name="details"
            label="توضیحات سفارش"
            fullWidth
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            multiline
          />
        </div>

        <Button variant="contained" type="submit" sx={{ height: "50px" }}>
          ثبت سفارش
        </Button>
      </form>
    </section>
  );
}
