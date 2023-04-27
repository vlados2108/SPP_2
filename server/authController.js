const db = require("./mongoConnection");
const usersCollection = db.collection("Users");
const labsCollection = db.collection("LabsCollection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("./config");


const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ message: "Error occured while validation", errors });
      }
      const { username, password } = req.body;
      const candidate = await usersCollection.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Users with such name already exists" });
      }
      var hashPassword = bcrypt.hashSync(password, 7);
      const user = { username: username, password: hashPassword };
      await usersCollection.insertOne(user);
      return res.json({ message: "User succesfully registered" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await usersCollection.findOne({ username });
      if (!user) {
        return res.json({ message: `User ${username} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.json({ message: `Incorrect password` });
      }
      const token = generateAccessToken(user._id);
      res.cookie("jwt", token, { httpOnly: true});
      res.send("JWT cookie has been set!");
      res.status(200);
    } catch (e) {
      console.log(e);
      res.status(401).json({ message: "Authorization error" });
    }
  }

  async verifyTokens(req, res,next) {
    try {
      const token = req.cookie.jwt; // Assuming the token is in the 'Authorization' header as 'Bearer <token>'
      // Verify the JWT token
      jwt.verify(token, secret , (err, decoded) => {
        if (err) {
          res.status(401).send("Unauthorized"); // JWT token is invalid or expired
        } else {
          // JWT token is valid, continue processing the protected route
          res.send("Protected route accessed successfully!");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await usersCollection.find().toArray();
      console.log(users);
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new AuthController();
