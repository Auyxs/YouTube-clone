import { isSubscribed } from "$lib/server/subscription.js";
import { getUserByName } from "$lib/server/user.js";
import { getUserVideos } from "$lib/server/video.js";

export async function load({ params, fetch, locals }) {
  const { slug } = params;
  const user = await getUserByName(slug.replace("@", ""));
  const videos = await getUserVideos(user.id);
  let subscribed = false;
  if (locals.user != null)
    subscribed = await isSubscribed(locals.user.id, user.id);
  return {
    subscribed,
    user: user,
    videos: videos,
  };
}
