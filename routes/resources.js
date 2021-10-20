const express = require("express");
const router = express.Router();

module.exports = (db) => {
  /*router.get("/", (req, res) => {
    res.render("index");
  });*/

  router.get("/resources", (req, res) => {
    res.render("resource-wall");
  });

  /*router.get("/resources", (req, res) => {
    let query = `SELECT url FROM resources`;
    db.query(query)
      .then(data => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch(err => {
        console.log("Error on", err);
        res
          .status(500)
          .json({ error: err.message });
      });
  });*/

  return router;
};
