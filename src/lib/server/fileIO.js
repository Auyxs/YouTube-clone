import fs from 'fs/promises'

export async function readFromFile(filePath){
    try {
        const data = await fs.readFile(filePath);
        return JSON.parse(data)
    } catch {
        throw new Error('Failed to read data');
    }
}

export async function writeOnFile(filePath, data){
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    } catch {
        throw new Error('Failed to save data')
    }
}