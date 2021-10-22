const express = require("express");
const router = express.Router();
const resourceQueries = require("../queries/wall-queries");
const checkAuth = require("../middlewares/check-auth");

module.exports = () => {
  //reviews

  router.get("/:id", checkAuth, (req, res) => {
    const userId = req.currentUser.id;
    resourceQueries.getURLById(userId)
      .then((url) => {
        res.json(url);
      });
  });

  router.get("/:id/detail", checkAuth, (req, res) => {
    res.render("resource-wall")
  });

  router.get("/:id/reviews", (req, res) => {
    resourceQueries.getReviews()
      .then((url) => {
        res.json(url);
      })
      .catch(err => {
        res.json({ error: err.message});
      });

    const userId = req.currentUser.id;
    let comment = req.body.text;
  });

  router.post("/:id/reviews",  (req, res) => {
    resourceQueries.addNewComment()
      .then(() => {

      })
      .catch(err => {
        res.json({ error: err.message});
      });


  });



  router.post("/", checkAuth, (req, res) => {
    const userId = req.currentUser.id;
    let comment = req.body.text;

    res.redirect("/reviews");

  });

  router.get("/", checkAuth, (req, res) => {
    const userId = req.currentUser.id;


    res.render("resource-wall.ejs");

  });


  return router;


};



