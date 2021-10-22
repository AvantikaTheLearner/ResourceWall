const express = require("express");
const router = express.Router();
const resourceQueries = require("../queries/wall-queries");
const checkAuth = require("../middlewares/check-auth");

module.exports = () => {

  router.get("/:id", (req, res) => {
    resourceQueries.getURLById(req.params.id)
      .then((url) => {
        res.json(url);
      });
  });


  router.get("/:id/reviews", (req, res) => {
    resourceQueries.getReviews()
      .then((url) => {
        res.json(url);
      })
      .catch(err => {
        res.json({ error: err.message});
      });
  });

  router.post("/:id/reviews", (req, res) => {
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


  });

  router.get("/", (req, res) => {

    //resourceQueries.getURL()
    //  .then((urls) => {
    //    res.json(urls);
    //  });

    res.render("resource-wall.ejs");

  });


  return router;


};



