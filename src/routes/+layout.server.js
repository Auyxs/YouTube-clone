import videosData from '$lib/data/video.json';

export async function load({ fetch, locals }) {
  const res = await fetch('https://dummyjson.com/users');
  const data = await res.json();

  const n = 12;
  const start = Math.random() * (videosData.length - n - 1) + 1

  const show_videos = videosData.slice(start, start + n)
  const videos = show_videos.map(video => {

    const user = data.users.find(user => user.id === video.user_id);
    return {
        ...video,
        user: user 
    };
  });

  return {
    videos: videos,
    logged_user: locals.user
  };
}
