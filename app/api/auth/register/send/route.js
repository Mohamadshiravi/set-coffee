import otpModel from "@/models/otp";
import userModel from "@/models/user";
import ConnectTODb from "@/utils/connecttodb";
const request = require("request");

export async function POST(req) {
  const { phone } = await req.json();
  const randomCode = Math.floor(100000 + Math.random() * 900000);

  // اتصال به دیتابیس
  await ConnectTODb();

  // حذف OTP‌های منقضی شده
  const DateNow = new Date().getTime();
  await otpModel.deleteMany({ phone });
  await otpModel.deleteMany({ expTime: { $lt: DateNow } });

  // بررسی وجود شماره تلفن در دیتابیس
  const isPhoneExist = await userModel.findOne({ phone });
  if (isPhoneExist) {
    return new Response(JSON.stringify({ message: "user Already Exist" }), {
      status: 409,
    });
  }

  //   const isPhoneBanned = await banUserModel.findOne({ phone });
  //   if (isPhoneBanned) {
  //     return new Response(JSON.stringify({ message: "user banned" }), {
  //       status: 400,
  //     });
  //   }

  try {
    // ارسال کد تایید
    const sendCode = () =>
      new Promise((resolve, reject) => {
        request.post(
          {
            url: "http://ippanel.com/api/select",
            body: {
              op: "pattern",
              user: process.env.SMS_PANEL_USERNAME,
              pass: process.env.SMS_PANEL_PASS,
              fromNum: "3000505",
              toNum: phone,
              patternCode: process.env.SMS_PANEL_PATTERN,
              inputData: [{ "verification-code": randomCode }],
            },
            json: true,
          },
          async function (error, response, body) {
            if (!error && response.statusCode === 200) {
              await otpModel.create({
                phone: phone,
                code: randomCode,
                expTime: new Date().getTime() + 120000,
              });
              resolve(true);
            } else {
              reject(false);
            }
          }
        );
      });

    const codeSent = await sendCode();
    if (codeSent) {
      return new Response(
        JSON.stringify({ message: "Code send successfully" }),
        { status: 201 }
      );
    } else {
      return new Response(JSON.stringify({ message: "Code not send" }), {
        status: 500,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Code not send" }), {
      status: 500,
    });
  }
}
