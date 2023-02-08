// express is a framework designed to create servers more easily
const express = require("express");

const restaurants = require("./routes/restaurants");

// this links to /db/index.js. it only works if you name it `index.js`
const db = require("./db");

const app = express();

// first argument is the `url`. **important** every single route in `restaurants` file will have `/restaurants` as a prefix
app.use("/restaurants", restaurants);

// im gonna create a small function
// this function is going to help me seed the database and start the express app
// seeding database means "put data into the database"

// async means "it will take some time to execute. after that time has passed, it can either fail or succeed"
// reasons it would fail
// 1. bad sql query
// 2. connection was lost
// 3. database was destroyed

const seedDatabaseAndStartServer = async () => {
  // try doing something. if it fails, catch the error
  try {
    // just connects to the database
    await db.connect();

    // the reason why people make some words capitalized is because they are sql keywords
    const sql = `
      DROP TABLE IF EXISTS restaurants;

      CREATE TABLE restaurants(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE,
        stars INTEGER
      );

      INSERT INTO restaurants(name, stars) VALUES('MCDONALDS', 3);

      INSERT INTO restaurants(name, stars) VALUES('ARBYS', 2);

      INSERT INTO restaurants(name, stars) VALUES('SUGARFISH', 10);

      INSERT INTO restaurants(name, stars) VALUES('COMFORTLAND', 10);
    `;

    await db.query(sql);
    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
};

seedDatabaseAndStartServer();
