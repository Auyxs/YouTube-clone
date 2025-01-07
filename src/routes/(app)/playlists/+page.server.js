import { getAllPlaylist } from "$lib/server/playlist.js";
import { getSubscribedVideos, getVideos } from "$lib/server/video.js";

export async function load({ locals }) {
  let playlists = null;
  if (locals.user !== null) {
    playlists = await getAllPlaylist(locals.user.id);
  }
  return { playlists };
}
