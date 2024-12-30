import { getSubscriptions } from '$lib/server/subscription.js';
import { getVideos } from '$lib/server/video.js';

export async function load({ locals }) {
  const videos = await getVideos(); 
  let subscriptions = [];
  if (locals.user != null) subscriptions = await getSubscriptions(locals.user.id)
  return { 
    videos,
    subscriptions
 };
}