import { createPlaylist } from "$lib/server/playlist";

export const POST = async ({ request, locals }) => {
  const formData = await request.formData();
  const title = formData.get("title");

  if (locals.user) {
    await createPlaylist(locals.user.id, title);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
};
