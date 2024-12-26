import videosData from '$lib/data/video.json';
import likeData from '$lib/data/like.json';
import commentData from '$lib/data/comment.json';
import subscriptionData from '$lib/data/subsciption.json'
import { promises as fs } from 'fs';
import path from 'path'

let cachedUsers = null;

export async function getUsers() {
  if (cachedUsers) return cachedUsers; 

  const res = await fetch('https://dummyjson.com/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  const data = await res.json();

  cachedUsers = data.users; 
  return cachedUsers;
}

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
    const like = likeData.filter(like => like.video_id == video.Id).length
    return {
        ...video,
        user,
        like
    };
}

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

export async function getUserById(user_id) {
    const users = await getUsers();
    const user = users.find(u => u.id === user_id);

    return {username: user.username, image: user.image}
}

export function hasLiked(userId, videoId) {
    return likeData.find(like => like.user_id == userId && like.video_id == videoId) !== undefined;
}

export async function addLike(userId, videoId) {
    const newLike = { user_id: +userId, video_id: +videoId };
    likeData.push(newLike);

    try {
        const filePath = path.resolve('src/lib/data/like.json'); 
        await fs.writeFile(filePath, JSON.stringify(likeData));
    } catch (err) {
        throw new Error('Failed to save like data');
    }
}

export async function removeLike(userId, videoId) {
    const updatedLikes = likeData.filter(like => like.user_id !== +userId || like.video_id !== +videoId);

    try {
        const filePath = path.resolve('src/lib/data/like.json');
        await fs.writeFile(filePath, JSON.stringify(updatedLikes, null, 2));
        likeData.length = 0;
        likeData.push(...updatedLikes);
    } catch (err) {
        throw new Error('Failed to save like data');
    }
}