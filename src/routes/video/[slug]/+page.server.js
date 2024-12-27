import { addComment, getVideoComments } from '$lib/server/comment.js';
import { addLike, hasLiked, removeLike } from '$lib/server/like.js';
import { isSubscibed, Subscribe, Unsubscribe } from '$lib/server/subscription.js';
import { getVideoById, getVideos } from '$lib/server/video.js';

export async function load({ params, locals }) {
  const { slug } = params;
  
  const video = await getVideoById(slug);    
  const comments = await getVideoComments(video.Id);
  const suggestedVideos = await getVideos(20);

  let liked = false;
  let subscribed = false;
  if (locals.user !== null) {
    liked = hasLiked(locals.user.id, slug);
    subscribed = isSubscibed(locals.user.id, video.user.id)
  }

  return {
    liked,
    subscribed,
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

    addcomment: async ({ params, locals, request }) => {
      if (locals.user != null) {
        const { slug } = params;
        const formData = await request.formData();
        const commentText = formData.get('comment'); 
    
        if (commentText) {
          await addComment(locals.user.id, slug, commentText);
        } 
      }
    },

    subscribe: async ({ params, locals }) => {
      if (locals.user != null) {
          const { slug } = params;
          const video = await getVideoById(slug); 
          await Subscribe(locals.user.id, video.user.id); 
      }
    },

    unsubscribe: async ({ params, locals }) => {
      if (locals.user != null) {
          const { slug } = params;
          const video = await getVideoById(slug); 
          await Unsubscribe(locals.user.id, video.user.id); 
      }
    }
}