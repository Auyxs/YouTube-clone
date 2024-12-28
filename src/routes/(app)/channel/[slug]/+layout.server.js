
import { getUserByName } from '$lib/server/user.js';
import { getUserVideos } from '$lib/server/video.js';

export async function load({ params, fetch }) {
    const { slug } = params;    
    const user = await getUserByName(slug.replace('@', ''))
    const videos = await getUserVideos(user.id);

    return {
        user: user,
        videos: videos
    };
}