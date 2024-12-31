import fs from 'fs/promises';
import { readFromFile, writeOnFile } from './fileIO';
import { getVideos } from './video';

const PLAYLIST_DATA_FILE = 'src/lib/data/playlist.json';

export async function findPlaylist(playlistData, userId, playlistName) {
    return playlistData.find(pl => pl.userId === userId && pl.name === playlistName);
}

export async function getPlaylistVideos(userId, playlistName) {
    const playlistData = await readFromFile(PLAYLIST_DATA_FILE);
    const playlist = await findPlaylist(playlistData, userId, playlistName);
    if (!playlist) throw new Error(`Playlist "${playlistName}" not found for user ${userId}`);
    return await getVideos(playlist.videos);
}

export async function addToPlaylist(videoId, userId, playlistName) {
    const playlistData = await readFromFile(PLAYLIST_DATA_FILE);
    const playlist = await findPlaylist(playlistData, userId, playlistName);
    if (!playlist) await createPlaylist(userId, playlistName)
    if (playlist.videos.includes(videoId)) throw new Error(`Video ${videoId} already exists in playlist "${playlistName}"`);
    playlist.videos.push(videoId);
    await writeOnFile(PLAYLIST_DATA_FILE, playlistData);
}

export async function removeFromPlaylist(videoId, userId, playlistName) {
    const playlistData = await readFromFile(PLAYLIST_DATA_FILE);
    const playlist = await findPlaylist(playlistData, userId, playlistName);
    if (!playlist) throw new Error(`Playlist "${playlistName}" not found for user ${userId}`);
    const videoIndex = playlist.videos.indexOf(videoId);
    if (videoIndex === -1) throw new Error(`Video ${videoId} not found in playlist "${playlistName}"`);
    playlist.videos.splice(videoIndex, 1);
    await writeOnFile(PLAYLIST_DATA_FILE, playlistData);
}

export async function createPlaylist(userId, playlistName) {
    const playlistData = await readFromFile(PLAYLIST_DATA_FILE);
    const existingPlaylist = await findPlaylist(playlistData, userId, playlistName);
    if (existingPlaylist) throw new Error(`Playlist "${playlistName}" already exists for user ${userId}`);
    const newPlaylist = { userId, name: playlistName, videos: [] };
    playlistData.push(newPlaylist);
    await writeOnFile(PLAYLIST_DATA_FILE, playlistData);
}
