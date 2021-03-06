/* requires*/
const {
  getUserByEmail,
  addNewUser,
  modifyUserProfile,
} = require("../queries/auth-queries");
const db = require("../lib/db.js");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

/*check if the email exist on db or no*/
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // check all required fields
  if (!email || !password) {
    return res.status(400).send("Please provide all required feilds");
  }

  // check if email is not exist;
  const results = await db.query(getUserByEmail, [email]);
  if (!results.rows.length) {
    return res.status(404).send("Email is not found!!");
  }

  //get user info
  const user = results.rows[0];

  //compairing the hash password from db with the one from req body
  bcrypt.compare(password, user.password, function (err, samePassword) {
    if (!samePassword) {
      return res.status(404).send("Wrong email or password");
    }

    //sendin the cookie to the client && redirect to home page
    req.session.userId = user.id;
    return res.redirect("/resources");
  });
};

/*Add new user for db*/
const createUser = async (req, res) => {
  console.log("req-body", req.body);
  const { name, email, password } = req.body;
  // check all required fields
  if (!name || !email || !password) {
    return res.status(400).send("Please provide all required feilds");
  }

  // check if email is already exist
  const results = await db.query(getUserByEmail, [email]);
  if (results.rows.length > 0) {
    return res.status(400).send("You already has an account!!");
  }

  //creat new account
  //hash the password before saving indb
  const hashPassword = await bcrypt.hash(password, salt);
  console.log("hashpassword", hashPassword);
  //insert the new user info in db
  db.query(addNewUser, [name, email, hashPassword], (error, resualt) => {
    if (error) {
      return res.status(400).send(error.message);
    }

    // user info after adding them to db
    const user = resualt.rows[0];
    //store the session and insert the userId in it && redirect to the home page
    req.session.userId = user.id;
    //res.send("login is success");
    res.status(200).redirect("/resources");
  });
};

const updateProfile = async (req, res) => {
  const user = req.currentUser;
  const email = user.email;
  const userId = user.id;
  const getUser = await db.query(getUserByEmail, [email]);
  if (!getUser) {
    return res.status(404).send("there is a problem with query from db!!");
  }
  const newName = req.body.name;
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  console.log({
    newName: newName,
    newEmail: newEmail,
    newPassword: newPassword,
  });
  const updateUserInfo = await db.query(modifyUserProfile, [
    userId,
    newName,
    newEmail,
    newPassword,
  ]);
  if (!updateUserInfo) {
    return res.send("updating was not success!");
  }
  res.redirect("/resources");
};
module.exports = { loginUser, createUser, updateProfile };
