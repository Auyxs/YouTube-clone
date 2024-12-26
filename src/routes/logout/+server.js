import { redirect } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
  cookies.delete('accessToken', { path: '/' }); 
  redirect(302, '/'); 
};