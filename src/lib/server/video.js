import videosData from '$lib/data/video.json';
import { getLikes } from './like';
import { getUsers, getUserById } from './user';

export async function getVideos(limit = 12) {
    const start = Math.floor(Math.random() * (videosData.length - limit - 1));
    const selectedVideos = videosData.slice(start, start + limit);

    return await Promise.all(selectedVideos.map((video) => getVideoById(video.Id)));
}

export async function getVideoById(id) {
    const users = await getUsers();
    const video = videosData.find(v => v.Id == id);

    if (!video) throw new Error('Video not found');

    const user = await getUserById(video.user_id);
    const like = await getLikes(video.Id);
    return {
        ...video,
        user,
        like
    };
}

export async function getUserVideos(userId) {
    return videosData.filter(video => video.user_id === +userId);
}