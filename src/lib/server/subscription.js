import { readFromFile, writeOnFile } from './fileIO';
const SUBSCRIBE_DATA_FILE = 'src/lib/data/subscription.json'

export async function isSubscibed(userId, channelUserId){
    const subData = await readFromFile(SUBSCRIBE_DATA_FILE);
    return subData.find(sub => sub.user_id == channelUserId && sub.subscribed_user_id == userId) !== undefined;
}

export async function getSubscribers(userId){
    const subData = await readFromFile(SUBSCRIBE_DATA_FILE);
    return subData.filter(sub => sub.user_id == userId).length;
}

export async function getSubscriptions(userId) {
    const subData = await readFromFile(SUBSCRIBE_DATA_FILE);
    return subData.filter(sub => sub.subscribed_user_id == +userId);
}

export async function Subscribe(userId, channelUserId){
    const subData = await readFromFile(SUBSCRIBE_DATA_FILE);
    const newSub = {user_id: +channelUserId, subscribed_user_id: +userId};
    subData.push(newSub);
    await writeOnFile(SUBSCRIBE_DATA_FILE, subData);
}

export async function Unsubscribe(userId, channelUserId){
    const subData = await readFromFile(SUBSCRIBE_DATA_FILE);
    const updatedSubs = subData.filter(sub => sub.user_id !== +channelUserId || sub.subscribed_user_id !== +userId);
    await writeOnFile(SUBSCRIBE_DATA_FILE, updatedSubs)
}