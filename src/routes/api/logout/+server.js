import { json } from "@sveltejs/kit";

export const POST = async ({ cookies }) => {
  cookies.delete("accessToken", { path: "/" });
  return json({ success: true });
};
