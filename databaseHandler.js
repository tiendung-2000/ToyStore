const {MongoClient,ObjectId} = require('mongodb')

const DATABASE_URL = 'mongodb+srv://longntgch18726:123456long@cluster0.fxhvj.mongodb.net/test'
const DATABASE_NAME = 'atnshop'

async function getDatabase() {
    const client = await MongoClient.connect(DATABASE_URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function getDocumentById(id,collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).findOne({_id:ObjectId(id)})
    return result;
}

async function getAll(collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).find({}).toArray()
    return result
}

async function insertToDB(obj,collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).insertOne(obj)
    console.log("Gia tri id moi duoc insert la: ", result.insertedId.toHexString());
}

async function deleteObject(id,collectionName){
    const dbo = await getDatabase()
    await dbo.collection(collectionName).deleteOne({_id:ObjectId(id)})
}

async function updateDocument(id, updateValues,collectionName){
    const dbo = await getDatabase();
    await dbo.collection(collectionName).updateOne({_id:ObjectId(id)},updateValues)
}

async function dosearch(condition,collectionName){
    const dbo = await getDatabase();
    const searchCondition = new RegExp(condition,'i')
    var results = await dbo.collection(collectionName).find({name:searchCondition}).toArray();
    return results;
}
async function category(condition,collectionName){
    const dbo = await getDatabase();
    const categoryCondition = new RegExp(condition,'i')
    var results = await dbo.collection(collectionName).find({category:categoryCondition}).toArray();
    return results;
}
module.exports = {insertToDB,getAll,deleteObject,getDocumentById,updateDocument,dosearch,category}