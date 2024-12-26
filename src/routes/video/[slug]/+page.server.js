import { getVideoById, getPosts, getVideos, getUsers, processPostsAndCreateComments, getAuthor } from '$lib/server/db.js';

export async function load({ params }) {
  const { slug } = params;
  
  const video = await getVideoById(slug);
  const author = await getAuthor(video.user_id)
  
  const posts = await getPosts();
  const users = await getUsers();
  
  const comments = await processPostsAndCreateComments(posts, users);
  const suggestedVideos = await getVideos(30);
  console.log(suggestedVideos.length)

  return {
    video,
    comments,
    author,
    suggestedVideos
  };
}
