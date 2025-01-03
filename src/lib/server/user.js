import { getSubscribers } from "./subscription";

let cachedUsers = null;

export async function getUsers() {
  if (cachedUsers) return cachedUsers;
  const res = await fetch("https://dummyjson.com/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  cachedUsers = data.users;
  return cachedUsers;
}

export async function getUserById(userId) {
  const users = await getUsers();
  const user = users.find((u) => u.id === userId);
  const subs = await getSubscribers(user.id);
  return {
    id: user.id,
    username: user.username,
    image: user.image,
    subscribers: subs,
  };
}

export async function getUserByName(username) {
  const users = await getUsers();
  const user = users.find((u) => u.username == username);
  const subs = await getSubscribers(user.id);
  return {
    id: user.id,
    username: user.username,
    image: user.image,
    subscribers: subs,
  };
}
