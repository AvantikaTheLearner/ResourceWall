const getUserEmailAndPassword = `
SELECT *
FROM users
WHERE $1 =email
AND $2 = password`;

const getUserEmail = `
SELECT *
FROM users
WHERE $1 =email`;

const addNewUser = `INSERT INTO
users (name, email, password)
VALUES ($1, $2, $3);`;

module.exports = {
  getUserEmailAndPassword,
  getUserEmail,
  addNewUser,
};
