import videosData from '$lib/data/video.json';

export async function load({ params, fetch }) {
    const usersRes = await fetch('https://dummyjson.com/users');
    const usersData = await usersRes.json();
    const { slug } = params;
    
    const user =  usersData.users.find(user => '@' + user.username == slug);
    const videos = videosData.filter(video => video.user_id === user.id);

    return {
        user: user,
        videos: videos
    };
}