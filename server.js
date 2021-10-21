// load .env data into process.env
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const db = require("./lib/db.js");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
//const bodyParser = require("body-parser");
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
const resourceRoutes = require("./routes/resources");
const homeRoutes = require("./routes/home-page");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", authRoutes);
app.use("/home", homeRoutes(db));
//app.use("/api/users", usersRoutes(db));

app.use("/resources", resourceRoutes());

//ToDO
//app.use("/creat-new-resource", newresourceroute());

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
