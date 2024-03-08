// Brandons
const express = require("express");
const router = express.Router();
var db = require("../database/db-connector");

router.use((req, res, next) => {
  next();
});

router.get("/publishers", function (req, res) {
  let query1 = "SELECT * FROM Publishers;";

  db.pool.query(query1, function (error, rows, fields) {

    return res.render("publishers", { data: rows });
  });
});

router.post("/add-publisher-form", function (req, res) {
  let data = req.body;
  let query1 = `INSERT INTO Publishers (publisherName) 
                VALUES 
                ('${data["input-publisherName"]}')`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect("/publishers");
    }
  });
});

router.delete('/delete-publisher-ajax/', function (req, res) {
  let data = req.body;
  let query = `DELETE FROM Publishers WHERE publisherID = ?`;
  db.pool.query(query, [data.publisherID], function (error, rows, fields) {
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
