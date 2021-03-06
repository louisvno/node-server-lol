const Promise = require('bluebird')
const sqlite = require('sqlite')
const path = require('path')
const dbPromise = sqlite.open(path.resolve('database.sqlite'), { Promise });

exports.getMediaList = async ()=>{
    const db = await dbPromise;
    const mediaList= await db.all('SELECT id,resourceId FROM media');
    return mediaList;
}

exports.addMedia = async (resourceId)=>{
    const db = await dbPromise;
    await db.run('INSERT INTO media(id,resourceId) VALUES(?,?)',null, resourceId);
    const mediaList = await this.getMediaList();
    return mediaList;
}

exports.deleteMedia = async(id)=>{
    const db = await dbPromise;
    await db.run('delete from media where id = ?', id);
    const mediaList = await this.getMediaList();
    return mediaList;
}

 exports.getMediaByRownum =async (number) => {
    const db = await dbPromise;
    const media = await db.get('select id, resourceId from media limit 1 offset ?', number - 1);
    return media;
 }