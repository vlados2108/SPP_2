const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
var path = require("path");
const cors = require("cors");

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

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(multer({ storage: storageConfig }).single("filedata"));
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");

app.get("/", async (request, responce) => {
   const collection = request.app.locals.collection;
   try {
      //await collection.deleteMany({});
      const labs = await collection.find({}).toArray();
      //console.log(labs);
      responce.status(200).send(JSON.stringify(labs));
   }
   catch (err) {
      console.log(err);
      responce.sendStatus(500);
   }
});

app.post("/add", urlencodedParser, async (request, responce) => {
   console.log(request.body);
   const subject = request.body.subject;
   const number = request.body.number;
   const status = request.body.status;
   const deadline = request.body.deadline;
   const attach = request.body.attach;
   var date = new Date().toLocaleDateString();
   var time = new Date().toLocaleTimeString();
   const dateTime = date + time;
   const lab = { subject: subject, number: number, status: status, deadline: deadline, attach: attach, time: dateTime };
   console.log(lab);
   const collection = request.app.locals.collection;

   try {
      await collection.insertOne(lab);
      const labs = await collection.find({}).toArray();
      responce.status(200).send(JSON.stringify(labs));
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