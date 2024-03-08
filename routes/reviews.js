// Brandons
const express = require("express");
const router = express.Router();
var db = require("../database/db-connector");

router.use((req, res, next) => {
  next();
});

router.get("/reviews", function (req, res) {
  let query1 = "SELECT * FROM Reviews;";
  let query2 = "SELECT * FROM Books";
  let query3 = "SELECT * FROM Users";

  db.pool.query(query1, function (error, rows, fields) {

    return res.render("reviews", { data: rows });
  });
});

router.post("/add-review-form", function (req, res) {
  let data = req.body;
  let query1 = `INSERT INTO Reviews (userID, isbn, rating, reviewText) 
                VALUES 
                ('${data["input-userID"]}', '${data["input-isbn"]}', '${data["input-rating"]}', '${data["input-reviewText"]}')`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect("/reviews");
    }
  });
});

router.delete('/delete-review-ajax/', function (req, res) {
  let data = req.body;
  let query = `DELETE FROM Reviews WHERE reviewID = ?`;
  db.pool.query(query, [data.reviewID], function (error, rows, fields) {
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
