/* requires*/
const {
  getUserEmail,
  getUserEmailAndPassword,
  addNewUser,
} = require("../queries/auth-queries");
const db = require("../lib/db.js");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

/*check if the email exist on db or no*/
const getUserFromDb = async (req, res) => {
  const { email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, salt);
  const results = await db.query(getUserEmailAndPassword, [
    email,
    hashPassword,
  ]);
  if (results.rows.length === 0) {
    res.status(404).send("Email is not found!!");
    return;
  }
  if (results.rows[0].password === password) {
    res.status(200).redirect("/login");
  }
};

/*Add new user for db*/
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  //console.log(name, email, password);

  const resualts = await db.query(getUserEmail, [email]);
  if (resualts.rows.length > 0) {
    res.status(200).send("You already has an account!!");
    return;
  }
  const hashPassword = bcrypt.hashSync(password, salt);
  console.log(hashPassword);
  db.query(addNewUser, [name, email, hashPassword], (error, resualt) => {
    if (error) {
      res.status(400).send(error.message);
      return;
    }
    res.status(200).redirect("/login");
  });
};

// const userLogout =(req,res) => {

// }
module.exports = { getUserFromDb, createUser };
