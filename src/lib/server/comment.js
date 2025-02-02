import { readFromFile, writeOnFile } from "./fileIO";
import { getUserById } from "./user";

const COMMENT_DATA_FILE = "src/lib/data/comment.json";

export async function getVideoComments(videoId) {
  const commentData = await readFromFile(COMMENT_DATA_FILE);
  const comments = commentData.filter((c) => c.videoId == +videoId);
  return await Promise.all(
    comments.map(async (comment) => {
      const user = await getUserById(comment.userId);
      return {
        ...comment,
        user,
      };
    })
  );
}

export async function addComment(userId, videoId, body) {
  const commentData = await readFromFile(COMMENT_DATA_FILE);
  const newCom = { userId: +userId, videoId: +videoId, body: body };
  commentData.push(newCom);
  await writeOnFile(COMMENT_DATA_FILE, commentData);
}

export async function deleteComment(userId, videoId, body) {
  const commentData = await readFromFile(COMMENT_DATA_FILE);
  const updatedCommentData = commentData.filter(
    (c) => c.userId != userId || c.videoId != videoId || c.body != body
  );
  await writeOnFile(COMMENT_DATA_FILE, updatedCommentData);
}

export async function editComment(userId, videoId, body, newbody) {
  const commentData = await readFromFile(COMMENT_DATA_FILE);
  const comment = commentData.find(
    (c) => c.userId == userId && c.videoId == videoId && c.body == body
  );
  comment.body = newbody;
  await writeOnFile(COMMENT_DATA_FILE, commentData);
}
