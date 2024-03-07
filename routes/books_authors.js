// Camerons
const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')
const { parse } = require('handlebars')

router.use((req, res, next) => {
    next()
  })


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
        console.log(booksAuthors)
        return res.render('books_authors', { data: booksAuthors, books: books, authors: authors });
      })      
    })
  })
});

module.exports = router