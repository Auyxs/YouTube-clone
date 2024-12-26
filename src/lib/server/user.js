let cachedUsers = null;

export async function getUsers() {
  if (cachedUsers) return cachedUsers; 

  const res = await fetch('https://dummyjson.com/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  const data = await res.json();

  cachedUsers = data.users; 
  return cachedUsers;
}

export async function getUserById(user_id) {
    const users = await getUsers();
    const user = users.find(u => u.id === user_id);

    return {username: user.username, image: user.image}
}

export async function getUserByName(username){
    const users = await getUsers();
    return users.find(u => u.username == username)
}