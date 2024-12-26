import commentData from '$lib/data/comment.json';
import { getUserById } from './user';

export async function getVideoComments(videoId){
    const comments = commentData.filter(c => c.video_id === videoId);
    return await Promise.all(comments.map(async comment => {
        const user = await getUserById(comment.user_id);
        return {
            ...comment,
            user
        }
    } ))
}
