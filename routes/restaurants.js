const router = require("express").Router();
const db = require("../db");

// i like to always put the prefix on top of each file
// /restaurants is the prefix
router.get("/", async (req, res, next) => {
  try {
    // write some sql that queries all the restaurants
    const sql = `SELECT * FROM restaurants;`;

    const response = await db.query(sql);

    res.send(`
      <html>
        <body>
          <ul>
            ${response.rows
              .map((row) => {
                return `<li>
                  <a href='/restaurants/${row.id}'>Name: ${row.name}</a>
                  <div>Stars: ${row.stars}</div>
                </li>`;
              })
              .join("")}
          </ul>
        </body>
      </html>
    `);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    // write some sql to get the row with `id`
    const sql = `SELECT * FROM restaurants WHERE id=$1;`;

    const response = await db.query(sql, [id]);
    res.send(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
