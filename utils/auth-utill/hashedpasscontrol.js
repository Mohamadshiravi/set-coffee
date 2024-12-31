import { compare, hash } from "bcryptjs";

export async function HashPassword(pass) {
  const res = await hash(pass, 12);
  return res;
}
export async function CheckHashPass(pass, hashedPass) {
  const res = await compare(pass, hashedPass);
  return res;
}
