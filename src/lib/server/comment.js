import commentData from '$lib/data/comment.json';
import { getUserById } from './user';
import {promises as fs} from 'fs';

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

export async function addComment(userId, videoId, body){
    const newCom = {user_id: +userId, video_id: +videoId, body: body};
    commentData.push(newCom);
    console.log(newCom)
    try {
        await fs.writeFile('src/lib/data/comment.json', JSON.stringify(commentData, null, 1))
    } catch {
        throw new Error("failed to save comment");
    }
}
