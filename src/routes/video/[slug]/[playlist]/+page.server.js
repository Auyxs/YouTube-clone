import { getPlaylistVideos } from '$lib/server/playlist.js';

export async function load({ params, locals }) {
  const playlistName = params.playlist;
  let videos = [];

  if (locals.user) {
    try {
        console.log(playlistName)
      videos = await getPlaylistVideos(locals.user.id, playlistName);
    } catch (err) {
      console.log("playlist not found", err);
    }
  }

  return {
    playlistName,
    videos
  };
}
