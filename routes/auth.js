const express = require("express");
const {
  getUserFromDb,
  createUser,
  userLogout,
} = require("../controllers/auth");
const router = express.Router();

//get login page
router.get("/login", (req, res) => {
  res.render("index");
  return;
});

//get sign-up page
router.get("/signUp", (req, res) => {
  res.render("sign-up");
  return;
});

// submitt login info
router.post("/login", getUserFromDb);

//Adding new user to db
router.post("/sign-up", createUser);

//log out
//router.post("/logout", userLogout);
module.exports = router;
