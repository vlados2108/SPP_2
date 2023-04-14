const express = require("express");
const db = require("./mongoConnection");
const authRouter = require("./authRouter");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
var path = require("path");
const cors = require("cors");

const multer = require("multer");
const Logger = require("nodemon/lib/utils/log");
const { cookie } = require("express-validator");
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "attaches");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const app = express();
app.use(cors({
   origin: "http://localhost:3000", // Set the allowed domain
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials:true
 }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use(multer({ storage: storageConfig }).single("filedata"));
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const collection = db.collection("LabsCollection");

app.get("/", async (request, responce) => {
  try {
    //await collection.deleteMany({});
    const labs = await collection.find({}).toArray();
    //console.log(labs);
    responce.status(200).send(JSON.stringify(labs));
  } catch (err) {
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
  const lab = {
    subject: subject,
    number: number,
    status: status,
    deadline: deadline,
    attach: attach,
    time: dateTime,
  };
  console.log(lab);

  try {
    await collection.insertOne(lab);
    const labs = await collection.find({}).toArray();
    responce.status(200).send(JSON.stringify(labs));
  } catch (err) {
    console.log(err);
    responce.sendStatus(500);
  }
});

app.delete("/delete", async (request, responce) => {
  if (!request.body) {
    responce.status(404).send("Incorrect data");
  }
  const { id } = request.body;
  console.log(id);
  try {
    await collection
      .findOneAndDelete({ time: id })
      .then((res) => console.log(res));
  } catch (err) {
    console.log(err);
    responce.sendStatus(500);
  }
});

(async () => {
  try {
    const port = process.env.PORT || 5000;
    app.listen(port);
    console.log("Сервер ожидает подключения...");
  } catch (err) {
    return console.log(err);
  }
})();
