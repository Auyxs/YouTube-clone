import { readFromFile, writeOnFile } from './fileIO';
import { getUserById } from './user';

const COMMENT_DATA_FILE = 'src/lib/data/comment.json'

export async function getVideoComments(videoId){
    const commentData = await readFromFile(COMMENT_DATA_FILE);
    const comments = commentData.filter(c => c.videoId == +videoId);
    return await Promise.all(comments.map(async comment => {
        const user = await getUserById(comment.userId);
        return {
            ...comment,
            user
        }
    } ))
}

export async function addComment(userId, videoId, body){
    const commentData = await readFromFile(COMMENT_DATA_FILE);
    const newCom = {userId: +userId, videoId: +videoId, body: body};
    commentData.push(newCom);
    await writeOnFile(COMMENT_DATA_FILE, commentData)
}
