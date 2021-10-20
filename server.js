// load .env data into process.env
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const db = require("./lib/db.js");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const newResourceRoutes = require("./routes/add_resource");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;

const app = express();

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
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 5000, httpOnly: true },
  })
);

// Note: Feel free to replace the example routes below with your own
const resourceRoutes = require("./routes/resources");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", authRoutes);
app.use("/api/users", usersRoutes(db));
app.use("/resources", resourceRoutes(db));
app.use("/new_resource", newResourceRoutes(db));

//ToDO
//app.use("/creat-new-resource", newresourceroute());

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
