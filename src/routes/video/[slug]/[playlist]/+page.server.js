import { goto } from '$app/navigation';
import { getPlaylistVideos } from '$lib/server/playlist.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params, locals }) {
  const playlistName = params.playlist;
  let videos = [];

  if (locals.user) {
    try {
      videos = await getPlaylistVideos(locals.user.id, playlistName);
    } catch (err) {
      console.log("playlist not found", err);
    }
  } else {
    redirect(302, "/")
  }

  return {
    playlistName,
    videos
  };
}
