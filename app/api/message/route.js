import messageModel from "@/models/message";

export async function POST(req) {
  const { nameAndLastName, email, phone, companyName, body } = await req.json();

  try {
    await messageModel.create({
      nameAndLastName,
      email,
      phone,
      companyName,
      body,
    });
    return Response.json({ message: "message aded" }, { status: 201 });
  } catch (e) {
    return Response.json({ message: "message not aded" }, { status: 500 });
  }
}
