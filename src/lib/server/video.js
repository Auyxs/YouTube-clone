import videosData from '$lib/data/video.json';
import { getLikes } from './like';
import { getSubscriptions } from './subscription';
import { getUsers, getUserById } from './user';

async function selectRandomVideos(limit) {
    const videoIds = new Set();
    while (videoIds.size < limit) {
        const randomIndex = Math.floor(Math.random() * videosData.length);
        videoIds.add(videosData[randomIndex].id);
    }
    return Array.from(videoIds); 
}

export async function getVideos(videoIds = [], limit = 12) {
    if (videoIds.length == 0) videoIds = await selectRandomVideos(limit);
    return await Promise.all(videoIds.map((id) => getVideoById(id)));
}

export async function getVideoById(id) {
    const users = await getUsers();
    const video = videosData.find(v => v.id == id);

    if (!video) throw new Error('Video not found');

    const user = await getUserById(video.userId);
    const like = await getLikes(video.id);
    return {
        ...video,
        user,
        like
    };
}

export async function getUserVideos(userId) {
    return videosData.filter(video => video.userId === +userId);
}

export async function getLikedVideos(likes) {
    return await Promise.all(likes.map((like) => getVideoById(like.videoId)));
}

export async function getSubscribedVideos(userId, limit = 12) {
    const subscribed = await getSubscriptions(userId);
    const videoIds = [];
    for (let sub of subscribed) {
        const userVideos = await getUserVideos(sub.id); 
        userVideos.forEach(video => videoIds.push(video.id)); 
    }

    if (videoIds.length > limit) {
        videoIds.sort(() => Math.random() - 0.5); 
        videoIds.splice(limit); 
    }

    return await getVideos(videoIds, limit);
}