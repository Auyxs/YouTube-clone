import { getVideoById, getVideos, getVideoComments } from '$lib/server/db.js';

export async function load({ params }) {
  const { slug } = params;
  
  const video = await getVideoById(slug);    
  const comments = await getVideoComments(video.Id);
  const suggestedVideos = await getVideos(20);

  return {
    video,
    comments,
    suggestedVideos
  };
}
