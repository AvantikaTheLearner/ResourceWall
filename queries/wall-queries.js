const db = require('../lib/db');

const getURL = () => {
  return db.query('SELECT * FROM resources;')
    .then((response) => {
      return response.rows;
    });

};


const getURLById = (id) => {
  return db.query('SELECT * FROM resources WHERE id = $1', [id])
    .then((response) => {
      return response.rows;
    });
};

const getReviews = () => {
  return db.query('SELECT * FROM reviews')
    .then((response) => {
      return response.rows;
    });

};

const addNewComment  = (user_id, resource_id, comment) => {
  return db.query(`INSERT INTO
  reviews (user_id, resource_id, comment)
  VALUES ($1, $2, $3)
  `, [user_id, resource_id, comment])
    .then((response) => {
      return response.rows;
    });

};

const addNewRating  = (user_id, resource_id, comment) => {
  return db.query(`INSERT INTO
  reviews (user_id, resource_id, comment)
  VALUES ($1, $2, $3)
  `, [user_id, resource_id, comment])
    .then((response) => {
      return response.rows;
    });

};

const addNewComment  = (user_id, resource_id, comment) => {
  return db.query(`INSERT INTO
  reviews (user_id, resource_id, comment)
  VALUES ($1, $2, $3)
  `, [user_id, resource_id, comment])
    .then((response) => {
      return response.rows;
    });

};

module.exports = {
  getURL,
  getURLById,
  getReviews,
  addNewComment
};