import subData from '$lib/data/subscription.json'
import { error } from 'console';
import { promises as fs } from 'fs';

export function isSubscibed(userId, channelUserId){
    return subData.find(sub => sub.user_id == channelUserId && sub.subscribed_user_id == userId) !== undefined;
}

export async function getSubscribers(userId){
    return subData.filter(sub => sub.user_id == userId).length;
}

export async function getSubscriptions(userId) {
    return subData.filter(sub => sub.subscribed_user_id == +userId);
}

export async function Subscribe(userId, channelUserId){
    const newSub = {user_id: +channelUserId, subscribed_user_id: +userId};
    subData.push(newSub);

    try {
        await fs.writeFile('src/lib/data/subscription.json', JSON.stringify(subData, null, 1))
    } catch {
        throw new Error("failed to write subscription")
    }
}

export async function Unsubscribe(userId, channelUserId){
    const updatedSubs = subData.filter(sub => sub.user_id !== +channelUserId || sub.subscribed_user_id !== +userId);

    try {
        await fs.writeFile('src/lib/data/subscription.json', JSON.stringify(updatedSubs, null, 1));
        subData.length = 0;
        subData.push(...updatedSubs);
    } catch (err) {
        throw new Error('Failed to save sub data');
    }
}