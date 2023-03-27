const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
var path = require("path");

const multer = require("multer");
const Logger = require("nodemon/lib/utils/log");
const storageConfig = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "attaches");
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname);
   }
});

const app =express();
app.use(bodyParser.json());
app.use(multer({ storage: storageConfig }).single("filedata"));
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");

app.get("/", async (request, responce) => {
    const collection = request.app.locals.collection;
    try {
       //await collection.deleteMany({});
       const labs = await collection.find({}).toArray();
       responce.status(200).send(labs);
    }
    catch (err) {
       console.log(err);
       responce.sendStatus(500);
    }
 });

(async () => {
   try {
      await mongoClient.connect();
      app.locals.collection = mongoClient.db("LabsDb").collection("LabsCollection");
      const port = process.env.PORT || 5000;
      app.listen(port);
      console.log("Сервер ожидает подключения...");
   } catch (err) {
      return console.log(err);
   }
})();