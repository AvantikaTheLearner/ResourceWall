// load .env data into process.env
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const db = require("./lib/db.js");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;

const app = express();

/** Middlewares */
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.json());
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
    cookie: { secure: false, maxAge: null, httpOnly: true },
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const resourceRoutes = require("./routes/resources");
const homeRoutes = require("./routes/home-page");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", authRoutes());
app.use("/home", homeRoutes(db));
app.use("/api/users", usersRoutes(db));

app.use("/resources", resourceRoutes());


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
