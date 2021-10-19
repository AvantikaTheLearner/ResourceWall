const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  router.get("/resources", (req, res) => {
    res.render("resource-wall");
  });

  return router;
};
