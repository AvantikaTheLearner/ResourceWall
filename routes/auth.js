const express = require("express");
const { loginUser, createUser, updateProfile } = require("../controllers/auth");
const router = express.Router();

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
router.get("/update-profile", (req, res) => {
  const { name, email } = req.body;
  const templateVars = {
    name,
    email,
  };
  res.status(200).render("update-profile", templateVars);
});

// submitt login info
router.post("/login", loginUser);

//Adding new user to db
router.post("/sign-up", createUser);

router.post("/update-profile", updateProfile);

router.post ("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});
module.exports = router;
