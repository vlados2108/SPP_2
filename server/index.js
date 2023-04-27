const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const db = require("./mongoConnection");
const authRouter = require("./authRouter");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const schema = require("./schema");

const multer = require("multer");
const { cookie } = require("express-validator");
const authMiddleware = require("./middleware/authMiddleware");
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "attaches");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Set the allowed domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(multer({ storage: storageConfig }).single("filedata"));
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const collection = db.collection("LabsCollection");

const root = {
  getLabs: async () => {
    return await collection.find({}).toArray();
  },
  createLab: async ({ input }) => {
    var date = new Date().toLocaleDateString();
    var time = new Date().toLocaleTimeString();
    const dateTime = date + time;
    input.time = dateTime;
    await collection.insertOne(input);
  },
  deleteLab: async ({ time }) => {
    await collection
      .findOneAndDelete({ time: time })
      .then((res) => console.log(res));
  },
};

app.use("/auth", authRouter);

app.use(
  "/graphql",
  authMiddleware,
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

(async () => {
  try {
    const port = process.env.PORT || 5000;
    app.listen(port);
    console.log("Сервер ожидает подключения...");
  } catch (err) {
    return console.log(err);
  }
})();
