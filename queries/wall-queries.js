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
      return response.rows[0];
    });
};

const getReviews = () => {
  return db.query('SELECT * FROM reviews')
    .then((response) => {
      return response.rows;
    });

};

module.exports = {
  getURL,
  getURLById,
  getReviews
};
