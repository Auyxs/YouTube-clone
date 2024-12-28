export async function load({ locals }) {
  return { logged_user: locals.user };
}