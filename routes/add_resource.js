const express = require("express");
const router = express.Router();

module.exports = (db) => {

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

  router.get('/addResource',(req,res) => {
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
  router.post('/addResource',(req, res) => {
    const userId = req.session.currentUser.id;
    const { category, url, title, description } = req.body;

    createResource(userId, category, url, title, description);
    res.redirect("/index");
  });

  return router;
};
