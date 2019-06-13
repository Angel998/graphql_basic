require('dotenv').config();

const { DB_USER, DB_PASS, DB_NAME } = process.env;

module.exports = {
  url: `mongodb://${DB_USER}:${DB_PASS}@ds237267.mlab.com:37267/${DB_NAME}`
};
