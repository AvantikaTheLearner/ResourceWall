// Authentication and Authorization Middleware
const { getUserById } = require("../queries/auth-queries");
const db = require("../lib/db.js");

const checkAuth = async (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.redirect("login");
  }

  const userResualt = await db.query(getUserById, [userId]);
  if (!userResualt.rows.length) {
    return res.render("/login");
  }
  req.currentUser = userResualt.rows[0];
  next();
};

module.exports = checkAuth;
