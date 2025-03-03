"use client";

import { newErrorToast, newToast } from "@/utils/helper-function";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import allCountry from "@/utils/all-country";

export default function CheckoutDetails() {
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
    // validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values);
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
            name="firstname"
            label="نام"
            fullWidth
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            name="lastname"
            label="نام خانوادگی"
            fullWidth
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="flex items-center gap-2 ">
          <Select
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
        </div>
        <div>
          <Select
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
        </div>
        <div>
          <TextField
            name="address"
            label="ادرس"
            fullWidth
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            multiline
          />
        </div>
        <div>
          <TextField
            type="number"
            name="postCode"
            label="کد پستی"
            fullWidth
            value={formik.values.postCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <TextField
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
