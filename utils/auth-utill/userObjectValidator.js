import * as yup from "yup";

export default async function ValidateUserObj(user) {
  const userValidSchema = yup.object({
    name: yup
      .string()
      .required("لطفا نام خود را بنویسید")
      .min(3, "نام باید حدقل دو حرف باشد")
      .matches(/^[A-z]+$/, "لطفا فقط حروف انگلیسی وارد کنید"),
    username: yup
      .string()
      .required("لطفا برای خود یک نام کاربری ایجاد کنید")
      .min(6, "نام کاربری باید حدقل شیش حرف باشد")
      .matches(/^[A-z]+$/, "لطفا فقط حروف انگلیسی وارد کنید"),
    email: yup
      .string()
      .email("ایمیل صحیح نیست")
      .required("لطفا ایمیل خود را وارد کنید"),
    password: yup
      .string()
      .required("رمز عبور اجباری میباشد")
      .min(8, "رمز عبور شما باید حدقل هشت حرف باشد"),
  });

  try {
    const ValidateResponse = await userValidSchema.validate(user);
    return ValidateResponse;
  } catch (e) {
    return e.errors;
  }
}
