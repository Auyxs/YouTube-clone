import { getAllPlaylist } from "$lib/server/playlist.js";
import { getSubscribedVideos, getVideos } from "$lib/server/video.js";
import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  let playlists = null;
  if (locals.user !== null) {
    playlists = await getAllPlaylist(locals.user.id);
  } else {
      redirect(302, "/")
  }
  return { playlists };
}
