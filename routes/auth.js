const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  /*router.get("/home", (req, res) => {
    res.render("index");
  });*/

  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.get("/sign-up", (req, res) => {
    res.render("sign-up");
  });

  return router;
};
