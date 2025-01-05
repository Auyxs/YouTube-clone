import { Unsubscribe } from "$lib/server/subscription";
import { json } from "@sveltejs/kit";

export const POST = async ({ locals, request }) => {
  if (!locals.user) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const channelId = formData.get("channelId");

  try {
    await Unsubscribe(locals.user.id, channelId);
    return json({ success: true });
  } catch (error) {
    console.error("Unsubscribe failed:", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
};
