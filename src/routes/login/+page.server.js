import { fail } from '@sveltejs/kit';

/** @satisfies {import('./$types').Actions} */
export const actions = {
    login: async ({ request }) => {
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
        console.log(result)
        return { success: true };
    }
};