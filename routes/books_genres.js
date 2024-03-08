//Brandons
var db = require('../database/db-connector');
const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  next()
});


router.get('/books_genres', (req, res) => {
  let query1 = "SELECT * FROM Books_Genres";
  let query2 = "SELECT * FROM Books";
  let query3 = "SELECT * FROM Genres";

  db.pool.query(query1, function (error, rows, fields) {
    let booksGenres = rows;

    db.pool.query(query2, function (error, rows, fields) {
      let books = rows;

      db.pool.query(query3, function (error, rows, fields) {
        let genres = rows;

        // Map isbn to a title
        let bookmap = {}
        books.map(book => {
          let isbn = book.isbn;
          bookmap[isbn] = book["title"];
        })

        // Map genreID to a name
        let genremap = {}
        genres.map(genre => {
          let id = parseInt(genre.genreID, 10);
          genremap[id] = genre["genreName"]
        })

        books = books.map(book => {
          return Object.assign(book, { title: bookmap[book.isbn] })
        })

        genres = genres.map(genre => {
          return Object.assign(genre, { name: genremap[genre.genreID] })
        })

        booksGenres = booksGenres.map(ba => {
          return Object.assign(ba, { genreID: genremap[ba.genreID], isbn: bookmap[ba.isbn] })
        })
        return res.render('books_genres', { data: booksGenres, books: books, genres: genres });
      })
    })
  })
});

router.post("/add-books-genres-form", function (req, res) {
  let data = req.body;
  let query1 = `SELECT genreID FROM Genres where genreName = '${data["input-genreID"]}'`
  db.pool.query(query1, function (error, rows, fields) {
    let id = rows[0].genreID;
    let query2 = `INSERT INTO Books_Genres (isbn, genreID) VALUES ('${data["input-isbn"]}', '${id}')`;
    db.pool.query(query2, function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.redirect("/books_genres");
      }
    });
  })
});

router.delete('/delete-books-genres-ajax/', function (req, res) {
  let data = req.body;
  let query = `DELETE FROM Books_Genres WHERE assignmentID = ?`;
  db.pool.query(query, [data.assignmentID], function (error, rows, fields) {
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
