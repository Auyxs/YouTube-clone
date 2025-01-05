import { Subscribe } from "$lib/server/subscription";
import { json } from "@sveltejs/kit";

export const POST = async ({ locals, request }) => {
  if (!locals.user) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const channelId = formData.get("channelId");

  try {
    await Subscribe(locals.user.id, channelId);
    return json({ success: true });
  } catch (error) {
    console.error("Subscription failed:", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
};
