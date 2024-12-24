import { fail, redirect } from '@sveltejs/kit';

/** @satisfies {import('./$types').Actions} */
export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");
        console.log(username, password)

        const res = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, expiresInMins: 30 }),
            credentials: 'include'
        });

        if (!res.ok) {
            console.log('Invalid credentials')
            return fail(400, { username, incorrect: true  });
        }

        const result = await res.json();

        cookies.set('accessToken', result.accessToken, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60, 
        });

        redirect(302, '/'); 
        return {sucess: true};
    }
};