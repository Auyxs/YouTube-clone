import { createPlaylist } from "$lib/server/playlist";
import { json } from "@sveltejs/kit";

export const POST = async ({ request, locals }) => {
  if (!locals.user) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get("title");
    await createPlaylist(locals.user.id, title.trim());
    return json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to create playlist:", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
};
