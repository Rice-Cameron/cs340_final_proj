// Camerons
const express = require("express");
const router = express.Router();
var db = require("../database/db-connector");

router.use((req, res, next) => {
  next();
});

router.get("/authors", function (req, res) {
  let query1 = "SELECT * FROM Authors;";

  db.pool.query(query1, function (error, rows, fields) {
    console.log(rows)
    // remove time from birthdate
    // for (let i = 0; i < rows.length; i++) {
    //   rows[i].birthdate = rows[i].birthdate.toISOString().split('T')[0];
    // }
    return res.render("authors", { data: rows });
  });
});

router.post("/add-author-form", function (req, res) {
  let data = req.body;

  query1 = `INSERT INTO Authors (name, birthdate, biography) VALUES ('${data["input-name"]}', '${data["input-birthdate"]}', '${data["input-biography"]}')`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect("/authors");
    }
  });
});

module.exports = router;
