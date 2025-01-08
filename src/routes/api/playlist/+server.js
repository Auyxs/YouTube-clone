import {
  addToPlaylist,
  createPlaylist,
  deletePlaylist,
  removeFromPlaylist,
  updatePlaylistOrder,
} from "$lib/server/playlist";
import { error, json } from "@sveltejs/kit";

// create playlist
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

// delete playlist
export const DELETE = async ({ request, locals }) => {
  if (!locals.user) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get("title");
    await deletePlaylist(locals.user.id, title);
    return json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete playlist:", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
};

// add or remove video from playlist
export const PATCH = async ({ request, locals }) => {
  if (!locals.user) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.formData();
    const playlistName = data.get("playlistName");
    const videoId = data.get("videoId");
    const action = data.get("action");

    if (action === "add") {
      await addToPlaylist(videoId, locals.user.id, playlistName);
    } else if (action === "remove") {
      await removeFromPlaylist(videoId, locals.user.id, playlistName);
    }
    return json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to update playlist:", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
};

// reorder playlist videos
export const PUT = async ({ request, locals }) => {
  if (!locals.user) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const playlistName = formData.get("playlistName");
    const videos = JSON.parse(formData.get("videos"));
    await updatePlaylistOrder(locals.user.id, playlistName, videos);
    return json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to update playlist:", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
};
