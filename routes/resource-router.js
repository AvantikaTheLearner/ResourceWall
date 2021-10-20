const express = require("express");
const router = express.Router();
const resourceQueries = require("../queries/wall-queries")

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
          res.json({ error: err.message})
        })
    });

    router.get("/", (req, res) => {

      //resourceQueries.getURL()
      //  .then((urls) => {
      //    res.json(urls);
      //  });

      res.render("resource-wall.ejs")

    });




    return router;


  };



