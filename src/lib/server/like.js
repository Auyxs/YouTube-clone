import likeData from '$lib/data/like.json'
import { promises as fs } from 'fs';
import path from 'path'

export function hasLiked(userId, videoId) {
    return likeData.find(like => like.user_id == userId && like.video_id == videoId) !== undefined;
}

export async function getLikes(videoId) {
    return likeData.filter(like => like.video_id == videoId).length
}

export async function addLike(userId, videoId) {
    const newLike = { user_id: +userId, video_id: +videoId };
    likeData.push(newLike);

    try { 
        await fs.writeFile('src/lib/data/like.json', JSON.stringify(likeData));
    } catch (err) {
        throw new Error('Failed to save like data');
    }
}

export async function removeLike(userId, videoId) {
    const updatedLikes = likeData.filter(like => like.user_id !== +userId || like.video_id !== +videoId);

    try {
        await fs.writeFile('src/lib/data/like.json', JSON.stringify(updatedLikes, null, 2));
        likeData.length = 0;
        likeData.push(...updatedLikes);
    } catch (err) {
        throw new Error('Failed to save like data');
    }
}

export async function getUserLikes(userId) {
    return likeData.filter(like => like.user_id == userId);
}