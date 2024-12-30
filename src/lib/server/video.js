import videosData from '$lib/data/video.json';
import { getLikes } from './like';
import { getSubscriptions } from './subscription';
import { getUsers, getUserById } from './user';


export async function getVideos(limit = 12) {
    const start = Math.floor(Math.random() * (videosData.length - limit - 1));
    const selectedVideos = videosData.slice(start, start + limit);

    return await Promise.all(selectedVideos.map((video) => getVideoById(video.id)));
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
    const allVideos = await Promise.all(
        subscribed.map(async sub => await getUserVideos(sub.channelId))
    );

    const flatVideos = allVideos.flat();
    flatVideos.sort((a, b) => a.title.localeCompare(b.title));

    const start = Math.floor(Math.random() * Math.max(1, flatVideos.length - limit));
    const selectedVideos = flatVideos.slice(start, start + limit);

    return await Promise.all(selectedVideos.map(video => getVideoById(video.id)))
}