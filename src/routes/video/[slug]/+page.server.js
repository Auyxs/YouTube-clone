import { addComment, getVideoComments } from "$lib/server/comment.js";
import { addLike, hasLiked, removeLike } from "$lib/server/like.js";
import { addToPlaylist, getAllPlaylist, removeFromPlaylist } from "$lib/server/playlist.js";
import { isSubscribed } from "$lib/server/subscription.js";
import { getVideoById, getVideos } from "$lib/server/video.js";
import { redirect } from "@sveltejs/kit";

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

/** @satisfies {import('./$types').Actions} */
export const actions = {
  like: async ({ params, locals }) => {
    if (locals.user != null) {
      const { slug } = params;
      await addLike(locals.user.id, slug);
    } else {
      redirect("302", "/login");
    }
  },
  removelike: async ({ params, locals }) => {
    if (locals.user != null) {
      const { slug } = params;
      await removeLike(locals.user.id, slug);
    } else {
      redirect("302", "/login");
    }
  },
  addcomment: async ({ params, locals, request }) => {
    if (locals.user != null) {
      const { slug } = params;
      const formData = await request.formData();
      const commentText = formData.get("comment");

      if (commentText) {
        await addComment(locals.user.id, slug, commentText);
      }
    } else {
      redirect("302", "/login");
    }
  },
  updatePlaylist: async ({ request, locals }) => {
    const data = await request.formData();
    const playlistName = data.get("playlistName");
    const videoId = data.get("videoId");
    const action = data.get("action");

    if (action === "add") {
      await addToPlaylist(videoId, locals.user.id, playlistName);
    } else if (action === "remove") {
      await removeFromPlaylist(videoId, locals.user.id, playlistName);
    }
    return { success: true };
  },
};
