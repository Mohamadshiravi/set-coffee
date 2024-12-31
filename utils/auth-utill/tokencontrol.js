import { sign, verify } from "jsonwebtoken";

export async function JenerateAccessToken(payload) {
  const res = sign({ ...payload }, process.env.TOKEN_KEY, {
    expiresIn: "10d",
  });
  return res;
}
export async function ValidateToken(token) {
  try {
    const res = await verify(token, process.env.TOKEN_KEY);
    return res;
  } catch (e) {
    return false;
  }
}
