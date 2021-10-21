// load .env data into process.env
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const db = require("./lib/db.js");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const resourcesRoutes = require("./routes/resources");
const reviewsRoutes = require("./routes/resource-router");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;

const app = express();

//app.use(bodyParser.urlencoded({ extended: true }));

/** Middlewares */
app.use(morgan("dev"));

// using ejs templare.
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
app.use(
  session({
    secret: "ResourceWallMidTermProject",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: null, httpOnly: true },
  })
);

// Note: Feel free to replace the example routes below with your own

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", authRoutes);
app.use("/api/users", usersRoutes(db));
app.use("/resources", resourcesRoutes(db));
app.use("/reviews", reviewsRoutes());

//ToDO
//app.use("/creat-new-resource", newresourceroute());

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
