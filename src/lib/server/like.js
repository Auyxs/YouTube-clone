import fs from 'fs/promises';import { readFromFile, writeOnFile } from './fileIO'; 
import { addToPlaylist } from './playlist';

const LIKE_DATA_FILE = 'src/lib/data/like.json';

export async function hasLiked(userId, videoId) {
    const likeData = await readFromFile(LIKE_DATA_FILE);
    return likeData.find(like => like.userId == userId && like.videoId == videoId) !== undefined;
}

export async function getLikes(videoId) {
    const likeData = await readFromFile(LIKE_DATA_FILE);
    return likeData.filter(like => like.videoId == videoId).length;
}

export async function addLike(userId, videoId) {
    const likeData = await readFromFile(LIKE_DATA_FILE);
    if (likeData.find(like => like.userId == userId && like.videoId == videoId)) return;
    const newLike = { userId: +userId, videoId: +videoId };
    likeData.push(newLike);
    await addToPlaylist(videoId, userId, 'liked');
    await writeOnFile(LIKE_DATA_FILE, likeData);
}

export async function removeLike(userId, videoId) {
    const likeData = await readFromFile(LIKE_DATA_FILE);
    if (!likeData.find(like => like.userId == userId && like.videoId == videoId)) return;
    const updatedLikes = likeData.filter(like => like.userId !== +userId || like.videoId !== +videoId);
    await writeOnFile(LIKE_DATA_FILE, updatedLikes);
}

export async function getUserLikes(userId) {
    const likeData = await readFromFile(LIKE_DATA_FILE);
    return likeData.filter(like => like.userId == userId);
}
