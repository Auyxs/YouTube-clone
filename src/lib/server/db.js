import videosData from '$lib/data/video.json';

export async function getUsers() {
  const res = await fetch('https://dummyjson.com/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  const data = await res.json();
  return data.users;
}

export async function getPosts() {
  const res = await fetch('https://dummyjson.com/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  const data = await res.json();
  return data.posts;
}

export async function getVideos(limit = 12) {
  const users = await getUsers();
  const start = Math.floor(Math.random() * (videosData.length - limit - 1));
  const selectedVideos = videosData.slice(start, start + limit);

  return selectedVideos.map(video => ({
    ...video,
    user: users.find(user => user.id === video.user_id)
  }));
}

export async function getVideoById(id) {
  const users = await getUsers();
  const video = videosData.find(v => v.Id == id);
  if (!video) throw new Error('Video not found');

  return {
    ...video,
    user: users.find(user => user.id === video.user_id)
  };
}

export async function getAuthor(user_id) {
    const users = await getUsers();
    return users.find(u => u.id === user_id)
}

export async function processPostsAndCreateComments(posts, users) {
    let comments = [];
  
    posts.forEach(post => {
      users.forEach(user => {
        if (user.id === post.userId) {
          let comment = {
            username: user.username,
            image: user.image || 'https://via.placeholder.com/40',
            body: post.body,
            like: post.reactions.like
          };
          comments.push(comment);
        }
      });
    });
  
    return comments;
}