const express = require("express");
const {
  getUserFromDb,
  createUser,
  userLogout,
} = require("../controllers/auth");
const router = express.Router();

//get index page
router.get("/", (req, res) => {
  res.render("index");
  return;
});

//get home page
router.get("/home", (req, res) => {
  res.render("index");
  return;
});

//get login page
router.get("/login", (req, res) => {
  res.render("login");
  return;
});

//get sign-up page
router.get("/sign-up", (req, res) => {
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
