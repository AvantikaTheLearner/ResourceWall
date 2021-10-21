const express = require("express");
const { loginUser, createUser, updateProfile } = require("../controllers/auth");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");

//get index page
router.get("/", (req, res) => {
  const templateVars = {user: req.session.currentUser};
  res.render("index", templateVars);
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

// get update-profile page
router.get("/update-profile", checkAuth, (req, res) => {
  const user = req.currentUser;
  const templateVars = {
    name: user.name,
    email: user.email,
    userId: user.id,
  };
  res.status(200).render("update-profile", templateVars);
});

// submitt login info
router.post("/login", loginUser);

//Adding new user to db
router.post("/sign-up", createUser);

router.post("/update-profile", checkAuth, updateProfile);

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
