// Brandons
const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')

router.use((req, res, next) => {
  next()
})


router.get("/genres", function (req, res) {
  let query1 = "SELECT * FROM Genres;";

  db.pool.query(query1, function (error, rows, fields) {

    return res.render("genres", { data: rows });
  });
});

router.post("/add-genre-form", function (req, res) {
  let data = req.body;
  let query1 = `INSERT INTO Genres (genreName) 
                  VALUES 
                  ('${data["input-name"]}')`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect("/genres");
    }
  });
});

router.delete('/delete-genre-ajax/', function (req, res) {
  let data = req.body;
  let query = `DELETE FROM Genres WHERE genreID = ?`;
  db.pool.query(query, [data.genreID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      res.sendStatus(204);
    }
  });
})

module.exports = router;

