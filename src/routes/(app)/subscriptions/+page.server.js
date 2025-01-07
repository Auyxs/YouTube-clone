import { getSubscribedVideos, getVideos } from "$lib/server/video.js";

export async function load({ locals }) {
  let videos = null;
  if (locals.user !== null) {
    videos = await getSubscribedVideos(locals.user.id);
  }

  return { videos };
}
