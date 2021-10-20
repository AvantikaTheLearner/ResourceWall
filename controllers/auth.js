/* requires*/
const {
  getUserEmail,
  addNewUser,
  getUserId,
  modifyUserProfile,
} = require("../queries/auth-queries");
const db = require("../lib/db.js");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const authorization = require("../routes/check-auth");

/*check if the email exist on db or no*/
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //console.log(req.headers);

  // check all required fields
  if (!email || !password) {
    return res.status(400).send("Please provide all required feilds");
  }

  // check if email is not exist;
  const results = await db.query(getUserEmail, [email]);
  if (!results.rows.length) {
    return res.status(404).send("Email is not found!!");
  }

  //get user info
  const user = results.rows[0];

  //console.log(user);
  //compairing the hash password from db with the one from req body
  bcrypt.compare(password, user.password, function (err, samePassword) {
    if (!samePassword) {
      return res.status(404).send("Wrong email or password");
    }

    //sendin the cookie to the client && redirect to home page
    req.session.currentUser = { id: user.id };
    
    return res.redirect("/resources");
  });
};

/*Add new user for db*/
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  // check all required fields
  if (!name || !email || !password) {
    return res.status(400).send("Please provide all required feilds");
  }

  // check if email is already exist
  const resualts = await db.query(getUserEmail, [email]);
  if (resualts.rows.length > 0) {
    return res.status(400).send("You already has an account!!");
  }

  //creat new account
  //hash the password before saving indb
  const hashPassword = await bcrypt.hash(password, salt);

  //insert the new user info in db
  db.query(addNewUser, [name, email, hashPassword], (error, resualt) => {
    if (error) {
      return res.status(400).send(error.message);
    }

    // user info after adding them to db
    const user = resualt.rows[0];

    //store the session and insert the userId in it && redirect to the home page
    req.session.currentUser = { id: user.id };
    console.log("id:", req.session.currentUser.id);
    //res.send("login is success");
    res.status(200).redirect("/resources");
    console.log(req.session.currentUser.id);
  });
};

const updateProfile = async (req, authorization, res) => {
  // const userId = req.session;
  // console.log(userId.id);
  // console.log(userId);
  // const resualts = await db.query(getUserEmail, [email], (error, resualt) => {
  //   if (error) {
  //     console.log("there is an error");
  //   }
  //   const userDb = resualt.rows[0].id;
  //   console.log(userDb);
  // });
  // console.log("data:", req.body);
  // console.log("headers:", req.headers.authorization);
  //const authHeader = req.headers.authorization;
  const { name, email, password } = req.body;
  const updateProfileResults = await db.query(modifyUserProfile, [
    name,
    email,
    password,
  ]);
  if (updateProfileResults) {
    res.send("updating was success!");
  }
};
module.exports = { loginUser, createUser, updateProfile };
