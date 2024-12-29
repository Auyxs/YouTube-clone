import { Unsubscribe } from '$lib/server/subscription';
import { getVideoById } from '$lib/server/video';
import { redirect } from '@sveltejs/kit';

export const POST = async ({locals, request}) => {
    if (locals.user != null) {
        const formData = await request.formData();
        const channelId = formData.get('channelId');
        await Unsubscribe(locals.user.id, channelId); 
        return redirect(302, '/');
    } else {
        redirect('302', '/login')
    }
}