// Camerons
var db = require('../database/db-connector');
const router = express.Router();
const express = require("express");

router.use((req, res, next) => {
    next()
});


router.get('/books_authors', (req, res) => {
  let query1 = "SELECT * FROM Books_Authors";
  let query2 = "SELECT * FROM Books";
  let query3 = "SELECT * FROM Authors";

  db.pool.query(query1, function(error, rows, fields){
    let booksAuthors = rows;

    db.pool.query(query2, function(error, rows, fields){
      let books = rows;

      db.pool.query(query3, function(error, rows, fields){
        let authors = rows;
        
        // Remove trailing info on birthdate
        for (let i = 0; i < authors.length; i++) {
          authors[i].birthdate = authors[i].birthdate.toISOString().split('T')[0];
        }
        
        // Map isbn to a title
        let bookmap = {}   
        books.map(book => {
          let isbn = book.isbn;
          bookmap[isbn] = book["title"];
        })
        
        // Map authorID to a name
        let authormap = {}
        authors.map(author => {
          let id = parseInt(author.authorID, 10);
          authormap[id] = author["name"]
        })

        books = books.map(book => {
          return Object.assign(book, {title: bookmap[book.isbn]})
        })

        authors = authors.map(author => {
          return Object.assign(author, {name: authormap[author.authorID]})
        })

        booksAuthors = booksAuthors.map(ba => {
          return Object.assign(ba, {authorID: authormap[ba.authorID]})
        })
        return res.render('books_authors', { data: booksAuthors, books: books, authors: authors });
      })      
    })
  })
});

router.post("/add-books-authors-form", function (req, res) {
  let data = req.body;
  let query1 = `SELECT authorID FROM Authors where name = '${data["input-authorID"]}'`
  db.pool.query(query1, function(error, rows, fields){
    let id = rows[0].authorID;
    let query2 = `INSERT INTO Books_Authors (isbn, authorID) VALUES ('${data["input-isbn"]}', '${id}')`;
    db.pool.query(query2, function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.redirect("/books_authors");
      }
    });
  })
});

router.delete('/delete-books-authors-ajax/', function(req, res){
  let data = req.body;
  let query = `DELETE FROM Books_Authors WHERE authorshipID = ?`;
  db.pool.query(query, [data.authorshipID], function(error, rows, fields){
    if(error){
      console.log(error);
      res.sendStatus(400);
    }
    else{
      res.sendStatus(204);
    }
  });
})

module.exports = router;
