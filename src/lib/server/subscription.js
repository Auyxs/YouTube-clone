import { readFromFile, writeOnFile } from './fileIO';
const SUBSCRIBE_DATA_FILE = 'src/lib/data/subscription.json'

export async function isSubscribed(userId, channelId){
    const subData = await readFromFile(SUBSCRIBE_DATA_FILE);
    return subData.find(sub => sub.userId == userId && sub.channelId == channelId) !== undefined;
}

export async function getSubscribers(channelId){
    const subData = await readFromFile(SUBSCRIBE_DATA_FILE);
    return subData.filter(sub => sub.channelId == channelId).length;
}

export async function getSubscriptions(userId) {
    const subData = await readFromFile(SUBSCRIBE_DATA_FILE);
    return subData.filter(sub => sub.userId == +userId);
}

export async function Subscribe(userId, channelId){
    const subData = await readFromFile(SUBSCRIBE_DATA_FILE);
    const newSub = {userId: +userId, channelId: +channelId};
    subData.push(newSub);
    await writeOnFile(SUBSCRIBE_DATA_FILE, subData);
}

export async function Unsubscribe(userId, channelId){
    const subData = await readFromFile(SUBSCRIBE_DATA_FILE);
    const updatedSubs = subData.filter(sub => sub.userId !== +userId || sub.channelId !== +channelId);
    await writeOnFile(SUBSCRIBE_DATA_FILE, updatedSubs)
}