const getUserEmail = `
SELECT *
FROM users
WHERE email = $1`;

const getUserId = `
SELECT *
FROM users
WHERE  id = $1`;

const addNewUser = `INSERT INTO
users (name, email, password)
VALUES ($1, $2, $3)
RETURNING id;
`;

const modifyUserProfile = "UPDATE users SET name =$1, email =$2, password=$3 ";

module.exports = {
  getUserEmail,
  addNewUser,
  getUserId,
  modifyUserProfile,
};
