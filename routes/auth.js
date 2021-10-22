const express = require("express");
const { loginUser, createUser, updateProfile } = require("../controllers/auth");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const sessionName = require("../server");
//get index page
router.get("/", checkAuth, (req, res) => {
  const user = req.currentUser;
  const templateVars = {
    name: user.name,
    email: user.email,
    userId: user.id,
  };
  res.render("index", templateVars);
  return;
});

//get home page
router.get("/home", checkAuth, (req, res) => {
  const user = req.currentUser;
  const templateVars = {
    name: user.name,
    email: user.email,
    userId: user.id,
  };
  res.render("index", templateVars);
  return;
});

//get login page
router.get("/login", (req, res) => {
  // if (req.session) {
  //   req.session.cookie.maxAge = 0;
  //   return res.render("login");
  // }
  res.render("login");
  return;
  //console.log("reqSession:", req.session);
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

router.post("/logout", checkAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send("The cookie can not be removed!!");
    }
    res.clearCookie(sessionName);
    res.redirect("/login");
  });
  //console.log("reqSession:", req.session);
});

module.exports = router;
