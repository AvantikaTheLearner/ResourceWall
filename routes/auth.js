const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  router.get("/sign-up", (req, res) => {
    res.render("sign-up");
  });

  return router;
};
