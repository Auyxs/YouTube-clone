import { goto } from "$app/navigation";

export const POST = async ({ cookies }) => {
  cookies.delete("accessToken", { path: "/" });
  goto('/')
};
