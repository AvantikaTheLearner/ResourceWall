const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");

module.exports = (db) => {
  router.get("/", checkAuth, (req, res) => {
    const user = req.currentUser;
    const templateVars = {
      name: user.name,
      email: user.email,
      userId: user.id,
    };
    res.render("index", templateVars);
  });

  router.get("/resources", (req, res) => {
    let query = `SELECT resources.url, resources.title, categories.category_name FROM resources
    JOIN categories ON categories.id = category_id`;
    db.query(query)
      .then((data) => {
        const resources = data.rows;
        console.log(resources);
        res.json({ resources });
      })
      .catch((err) => {
        console.log("Error on", err);
        res.status(500).json({ error: err.message });
      });
  });

  const createResource = function(userId, category, url, title, description) {
    let query = `INSERT INTO resources (user_id, category_id, url, title, description)
    VALUES ($1, $2, $3, $4, $5)`;

    db.query(query, [userId, category, url, title, description])
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  router.get("/new_resource", checkAuth, (req, res) => {
    const user = req.currentUser;
    const templateVars = {
      name: user.name,
      email: user.email,
      userId: user.id,
    };
    if (user) {
      res.render("new_resource", templateVars);
    } else {
      res.redirect("/login");
    }
  });

  //Adding new resources
  router.post("/new_resource", checkAuth, (req, res) => {
    const userId = req.currentUser.id;
    const { category, url, title, description } = req.body;

    createResource(userId, category, url, title, description);
    res.redirect("/resources");
  });

  return router;
};
