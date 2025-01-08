import { getUserLikes } from "$lib/server/like.js";
import { getPlaylistVideos } from "$lib/server/playlist.js";
import { getLikedVideos } from "$lib/server/video.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params, locals }) {
  let videos = [];
  const { slug } = params;
  if (locals.user) {
    try {
      videos = await getPlaylistVideos(locals.user.id, slug);
    } catch {
      console.log("playlist not found");
    }
  } else {
      redirect(302, "/")
  }
  return {
    videos: videos,
    playlistName: slug,
  };
}
