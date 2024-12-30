import fs from 'fs/promises';import { readFromFile, writeOnFile } from './fileIO'; 
import { addToPlaylist } from './playlist';

const LIKE_DATA_FILE = 'src/lib/data/like.json';

export async function hasLiked(userId, videoId) {
    const likeData = await readFromFile(LIKE_DATA_FILE);
    return likeData.find(like => like.user_id == userId && like.video_id == videoId) !== undefined;
}

export async function getLikes(videoId) {
    const likeData = await readFromFile(LIKE_DATA_FILE);
    return likeData.filter(like => like.video_id == videoId).length;
}

export async function addLike(userId, videoId) {
    const likeData = await readFromFile(LIKE_DATA_FILE);
    if (likeData.find(like => like.user_id == userId && like.video_id == videoId)) return;
    const newLike = { user_id: +userId, video_id: +videoId };
    likeData.push(newLike);
    await addToPlaylist(videoId, userId, 'liked');
    await writeOnFile(LIKE_DATA_FILE, likeData);
}

export async function removeLike(userId, videoId) {
    const likeData = await readFromFile(LIKE_DATA_FILE);
    if (!likeData.find(like => like.user_id == userId && like.video_id == videoId)) return;
    const updatedLikes = likeData.filter(like => like.user_id !== +userId || like.video_id !== +videoId);
    await writeOnFile(LIKE_DATA_FILE, updatedLikes);
}

export async function getUserLikes(userId) {
    const likeData = await readFromFile(LIKE_DATA_FILE);
    return likeData.filter(like => like.user_id == userId);
}
