import { getVideoComments } from "$lib/server/comment.js";
import { hasLiked } from "$lib/server/like.js";
import { getAllPlaylist } from "$lib/server/playlist.js";
import { isSubscribed } from "$lib/server/subscription.js";
import { getVideoById, getVideos } from "$lib/server/video.js";

export async function load({ params, locals }) {
  const { slug } = params;

  const video = await getVideoById(slug);
  const comments = await getVideoComments(video.id);
  const suggestedVideos = await getVideos([], 20);

  let liked = false;
  let subscribed = false;
  let playlists = [];
  if (locals.user !== null) {
    liked = await hasLiked(locals.user.id, slug);
    subscribed = await isSubscribed(locals.user.id, video.user.id);
    playlists = await getAllPlaylist(locals.user.id);
  }

  return {
    liked,
    subscribed,
    video,
    comments,
    suggestedVideos,
    playlists,
  };
}
