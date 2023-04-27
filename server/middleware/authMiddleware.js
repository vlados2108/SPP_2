const jwt = require('jsonwebtoken')
const { secret } = require("../config");
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Token not returned" });
    jwt.verify(token,secret,(err,decoded)=>{
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      } else {
        req.user = decoded;
        next();
      }
    })
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "User unauthorized" });
  }
};
