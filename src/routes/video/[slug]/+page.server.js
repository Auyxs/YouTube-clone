import { getVideoComments } from '$lib/server/comment.js';
import { addLike, hasLiked, removeLike } from '$lib/server/like.js';
import { getVideoById, getVideos } from '$lib/server/video.js';

export async function load({ params, locals }) {
  const { slug } = params;
  
  const video = await getVideoById(slug);    
  const comments = await getVideoComments(video.Id);
  const suggestedVideos = await getVideos(20);

  let liked = false;
  if (locals.user !== null) liked = hasLiked(locals.user.id, slug);

  return {
    liked,
    video,
    comments,
    suggestedVideos
  };
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
    like: async ({params, locals}) => {
      const { slug } = params;
      if (locals.user != null)
        await addLike(locals.user.id, slug)
    },

    removelike: async ({params, locals}) => {
      const { slug } = params;
      if (locals.user != null)
        await removeLike(locals.user.id, slug)
    },

}