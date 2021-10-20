const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("index", { user: req.session.currentUser });
  });

  // router.get("/resources", (req, res) => {
  //   //const templateVars = { user: req.session.id };
  //   res.render("resource-wall" /*templateVars*/);
  // });

  return router;
};
