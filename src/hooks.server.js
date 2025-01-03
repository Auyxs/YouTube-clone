export async function handle({ event, resolve }) {
  const accessToken = event.cookies.get("accessToken");

  if (accessToken) {
    const res = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.ok) {
      const user = await res.json();
      event.locals.user = user;
    } else {
      event.cookies.delete("accessToken", { path: "/" });
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
}
