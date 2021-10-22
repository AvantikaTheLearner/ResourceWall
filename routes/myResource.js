const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");

module.exports = (db) => {

  const searchAllResourcesByID = function(userId) {
    let query = `SELECT resources.url, resources.image, resources.title, categories.category_name FROM resources
    JOIN categories ON categories.id = category_id
    WHERE resources.user_id = $1`;

    return db.query(query, [userId])
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log("Search query err.message:", err.message);
      });
  };

  router.get("/", checkAuth, (req, res) => {
    const userId = req.currentUser.id;
    const user = req.currentUser;
    const templateVars = {
      name: user.name,
      email: user.email,
      userId: user.id,
    };
    searchAllResourcesByID(userId).then((rows) => {
      templateVars["rows"] = rows;
      console.log("templateVars", templateVars);
      if (req.currentUser) {
        res.render("myResource", templateVars);
      } else {
        res.redirect("/login");
      }
    });
  });

  return router;
};
