import { addLike, removeLike } from "$lib/server/like";
import { json } from "@sveltejs/kit";

export const POST = async ({ request, locals }) => {
  if (!locals.user) return json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { videoId } = await request.json();
    console.log(videoId)
    await addLike(locals.user.id, videoId);
    return json({ success: true });
  } catch (error) {
    console.error("Failed to add like: ", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export const DELETE = async ({ request, locals }) => {
  if (!locals.user) return json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { videoId } = await request.json();
    await removeLike(locals.user.id, videoId);
    return json({ success: true });
  } catch (error) {
    console.error("Failed to remove like: ", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
};
