import { addComment, deleteComment } from "$lib/server/comment";
import { json } from "@sveltejs/kit";

// add comment
export const POST = async ({ locals, request }) => {
  if (!locals.user) return json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const body = formData.get("comment");
  const videoId = formData.get("videoId");

  try {
    await addComment(locals.user.id, videoId, body);
    return json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error adding comment", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
};

// delete comment
export const DELETE = async ({ locals, request }) => {
  if (!locals.user) return json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const body = formData.get("comment");
  const videoId = formData.get("videoId");

  try {
    await deleteComment(locals.user.id, videoId, body);
    return json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error adding comment", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
};
