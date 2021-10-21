const express = require("express");
const router = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("index", { user: req.session.currentUser });
  });

  router.get("/resources", (req, res) => {
    let query = `SELECT resources.url, resources.title, categories.category_name FROM resources
    JOIN categories ON categories.id = category_id`;
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
  });

  const createResource = function(userId, category, url, title, description) {

    let query = `INSERT INTO resources (user_id, category_id, url, title, description)
    VALUES ($1, $2, $3, $4, $5)`;

    db
      .query(query,[userId, category, url, title, description])
      .then(result => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  router.get('/new_resource',(req,res) => {
    res.render('new_resource');
    /*const userId = req.session.user_id;
    const loggedInUser = users[userId];
    const templateVars = {
      user: loggedInUser};
    if (!loggedInUser) {
      res.redirect("/index");
    } else {
      res.render('new_resource', templateVars);
    }*/

  });

  //Registering new users and checking for Errors
  router.post('/new_resource',(req, res) => {
    console.log(req.session.currentUser);
    const userId = req.session.currentUser.id;
    const { category, url, title, description } = req.body;

    createResource(userId, category, url, title, description);
    res.redirect("/");
  });

  const searchResourceByTitle = function(userId, title) {

    let query = `SELECT * FROM resources
    WHERE user_id = $1 AND title = $2`;

    db
      .query(query,[userId, title])
      .then(result => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  router.post('/search',(req, res) => {
    const title = req.body.title;
    const resourceFound = searchResourceByTitle(userId, title);
    if (!resourceFound) {
      res.send("Sorry, resource could not be found by title");
      res.redirect('/');
      return;
    }
    res.render("search");

  });

  return router;
};
