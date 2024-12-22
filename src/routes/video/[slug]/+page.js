import videosData from '$lib/data/video.json';

export async function load({ params, fetch }) {
    const postsRes = await fetch('https://dummyjson.com/posts');
    const postsData = await postsRes.json();

    const usersRes = await fetch('https://dummyjson.com/users');
    const usersData = await usersRes.json();

    const { slug } = params;

    const video = videosData.find(v => v.Id == slug); 
    const author = usersData.users.find(user => user.id === video.user_id);

    const n = 20;
    const start = Math.random() * (videosData.length - n - 1) + 1

    const show_videos = videosData.slice(start, start + n)
    const videos = show_videos.map(video => {
   
      const user = usersData.users.find(user => user.id === video.user_id);
      return {
          ...video,
          user: user 
      };
    });

    return {
        slug,
        posts: postsData.posts,
        users: usersData.users,
        author: author,
        video: video,
        videos: videos
    };
}
