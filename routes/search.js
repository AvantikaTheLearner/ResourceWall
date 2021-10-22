const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");

module.exports = (db) => {
  const searchResourceByTitle = function(userId, title) {
    let query = `SELECT resources.image, resources.url, resources.title, categories.category_name FROM resources
    JOIN categories ON categories.id = category_id
    WHERE resources.user_id = $1 AND resources.title = $2`;

    return db
      .query(query, [userId, title])
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //VVI : had to make a post request to /search to make it working
  //because req.body was empty and works differently for get request to /search
  router.post("/", checkAuth, (req, res) => {
    const title = req.body.search;
    const userId = req.currentUser.id;
    const user = req.currentUser;
    const templateVars = {
      name: user.name,
      email: user.email,
      userId: user.id,
    };

    searchResourceByTitle(userId, title)
      .then((rows) => {
        templateVars["rows"] = rows[0];
        if (req.currentUser) {
          res.render("search", templateVars);
        } else {
          res.send("Sorry, resource could not be found by title");
        }
      });
  });

  return router;
};
