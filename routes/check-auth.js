// Authentication and Authorization Middleware
const getUserEmail = require("../queries/auth-queries");
const db = require("../lib/db.js");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const auth = async (req, res, next) => {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, salt);

  const resualts = await db.query(getUserEmail, [email]);
  if (
    resualts.rows[0].length === 0 ||
    resualts.rows[0].password !== hashPassword
  ) {
    res.status(404).send("Sign up first!!");
    return;
  }
  const userId = resualts.rows[0].id;
  console.log("user:", userId);
  if (req.session && req.session.user === userId) return next();
  else return res.sendStatus(401);
};

module.exports = auth;
