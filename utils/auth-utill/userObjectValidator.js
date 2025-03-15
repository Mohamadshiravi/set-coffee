import * as yup from "yup";

export default async function ValidateUserObj(user) {
  const userValidSchema = yup.object({
    name: yup
      .string()
      .required("لطفا نام خود را بنویسید")
      .min(3, "نام باید حدقل دو حرف باشد")
      .matches(/^[A-z]+$/, "لطفا نام را با حروف انگلیسی وارد کنید"),
    username: yup
      .string()
      .required("لطفا برای خود یک نام کاربری ایجاد کنید")
      .min(6, "نام کاربری باید حدقل شیش حرف باشد")
      .matches(/^[A-z]+$/, "لطفا فقط حروف انگلیسی وارد کنید"),
    phone: yup
      .string()
      .matches(/^(\+98|0)?9\d{9}$/, "شماره موبایل صحیح نیست")
      .required("لطفا شماره موبایل خود را وارد کنید"),
  });

  try {
    const ValidateResponse = await userValidSchema.validate(user);
    return ValidateResponse;
  } catch (e) {
    return e.errors;
  }
}
