// pg is something to help communicate with the database
const pg = require("pg");

const db = new pg.Client("postgres://localhost/restaurants");

module.exports = db;
