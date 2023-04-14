const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
const db = mongoClient.db('LabsDb')
const collection = db.collection('LabsCollection');
const usersCollection = db.collection('Users');
module.exports = db;