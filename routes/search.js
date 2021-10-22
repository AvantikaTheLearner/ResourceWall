const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");

module.exports = (db) => {
  const searchResourceByTitle = function (title) {
    let query = `SELECT resources.image, resources.url, resources.title, categories.category_name FROM resources
    JOIN categories ON categories.id = category_id
    WHERE resources.title = $1`;

    return db
      .query(query, [title])
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  router.get("/", checkAuth, (req, res) => {
    const title = req.body.search;
    const userId = req.currentUser.id;
    // const userId = 15;
    const user = req.currentUser;
    const templateVars = {
      name: user.name,
      email: user.email,
      userId: user.id,
    };

    searchResourceByTitle(title).then((rows) => {
      templateVars["rows"] = rows;
      console.log("templateVars", templateVars);
      if (req.currentUser) {
        res.render("search", templateVars);
      } else {
        res.send("Sorry, resource could not be found by title");
      }
    });
  });

  return router;
};
