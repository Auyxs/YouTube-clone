import { getUserLikes } from '$lib/server/like.js'
import { getLikedVideos } from '$lib/server/video.js'

export async function load({locals}) {
    const likes = await getUserLikes(locals.user.id)
    const videos = await getLikedVideos(likes)

    return { videos: videos }
}