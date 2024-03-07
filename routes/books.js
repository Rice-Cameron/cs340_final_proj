const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')


router.use((req,res,next) => {
    next()
})


router.get('/books', function(req, res) {
    let query1;

    if (req.query.title === undefined)
    {
        query1 = "SELECT * FROM Books;";
    }

    else
    {
        query1 = `SELECT * FROM Books WHERE title LIKE "${req.query.title}%"`
    }

    let query2 = "SELECT * FROM Publishers;";

    db.pool.query(query1, function(error, rows, fields){
        
        let books = rows;
        
        db.pool.query(query2, (error, rows, fields) => {
            let publishers = rows;

            let pubmap = {}
            publishers.map(publisher => {
                let id = parseInt(publisher.publisherID, 10);

                pubmap[id] = publisher["publisherName"];
            })

            books = books.map(book => {
                return Object.assign(book, {publisherID: pubmap[book.publisherID]})
            })
            
            return res.render('books', {data: books, publishers: publishers});
        })
    })
});

router.post('/add-book-form', function(req, res){
    let data = req.body;
    let isbn = data['input-isbn']
    isbn.toString()
    query1 = `INSERT INTO Books (isbn, title, publicationYear, copiesAvailable, publisherID) VALUES ('${isbn}', '${data['input-title']}', '${data['input-pubyear']}', '${data['input-copies']}', '${data['input-pubID']}')`;
    db.pool.query(query1, function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400)
        }
        else{
            res.redirect('/books');
        }
    })

})

router.put('/put-book-ajax', function(req,res,next){
    let data = req.body;
    
    let isbn = data.isbn.toString()
    let title = data.title.toString()
    let pubyear = data.publicationYear.toString()
    let copies = data.copiesAvailable.toString()
    let pubname = data.publisherName.toString()
  
    let queryUpdateTitle = `UPDATE Books SET title = ? WHERE Books.isbn = ?`;
    let queryUpdateYear = `UPDATE Books SET publicationYear = ? WHERE Books.isbn = ?`;
    let queryUpdateCopies = `UPDATE Books SET copiesAvailable = ? WHERE Books.isbn = ?`;
    let queryUpdatePubID = `UPDATE Books SET publisherID = (SELECT publisherID FROM Publishers WHERE Publishers.publisherName = ?) WHERE Books.isbn = ?`;    
  
          db.pool.query(queryUpdateTitle, [title, isbn], function(error, rows, fields){
              if (error) {
                console.log(error);
                res.sendStatus(400);
              }
              else
              {
                  db.pool.query(queryUpdateYear, [pubyear, isbn], function(error, rows, fields) {
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } 
                      else {
                        db.pool.query(queryUpdateCopies, [copies, isbn], function(error, rows, fields) {
                            if (error) {
                                console.log(error)
                                res.sendStatus(400)
                            }
                            else{
                                db.pool.query(queryUpdatePubID, [pubname, isbn], function(error, rows, fields){
                                    if (error) { 
                                        console.log(error)
                                        res.sendStatus(400)
                                    }
                                    else{
                                        res.send(rows);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
});

router.delete('/delete-book-ajax/', function(req,res){
    let data = req.body;
    let isbn = data['isbn'];
    console.log(isbn)
    let deleteBooksAuthors = `DELETE FROM Books_Authors WHERE isbn = ?`
    let deleteBooksGenres = `DELETE FROM Books_Genres WHERE isbn = ?`
    let deleteBooksUsers = `DELETE FROM Books_Users WHERE isbn = ?`
    let deleteBook = `DELETE FROM Books WHERE isbn = ?`;

    db.pool.query(deleteBooksAuthors, [isbn], function(error, rows, fields){
              if (error) {
  
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                  db.pool.query(deleteBooksGenres, [isbn], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                        db.pool.query(deleteBooksUsers, [isbn], function(error, rows, fields){
                            if (error) {
                                console.log(error);
                                res.sendStatus(400)
                            }
                            else {
                                db.pool.query(deleteBook, [isbn], function(error, rows, fields){
                                    if (error) {
                                        console.log(error)
                                        res.sendStatus(400)
                                    }
                                    else{
                                        res.sendStatus(204);
                                    }
                                })
                            }
                        })
                      }
                  })
              }
  })});


module.exports = router