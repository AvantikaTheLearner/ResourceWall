const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
module.exports = () => {
  router.get("/", checkAuth, (req, res) => {
    const user = req.currentUser;
    const templateVars = {
      name: user.name,
      email: user.email,
      userId: user.id,
    };
    res.render("index", templateVars);
  });

  // router.get("/resources", (req, res) => {
  //   //const templateVars = { user: req.session.id };
  //   res.render("resource-wall" /*templateVars*/);
  // });

  return router;
};
