import { getVideos } from '$lib/server/db.js';

export async function load({ locals }) {
  const videos = await getVideos(); 
  
  return {
    videos,
    logged_user: locals.user
  };
}