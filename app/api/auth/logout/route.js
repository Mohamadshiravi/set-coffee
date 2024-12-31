export function POST() {
  return Response.json(
    { message: "You logedout" },
    {
      status: 200,
      headers: {
        "Set-Cookie": `token='';path=/;maxAge=${0};`,
      },
    }
  );
}
