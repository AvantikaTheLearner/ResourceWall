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

    router.post("/:id/reviews", (req, res) => {
      resourceQueries.addNewComment()
        .then(() => {

        })
        .catch(err => {
          res.json({ error: err.message})
        })


    });



    router.post("/", (req, res) => {

      let comment = req.body.text;
      console.log("TEST", comment)
      //addNewComment(user_id, resource_id, comment)

      res.send(comment);

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


