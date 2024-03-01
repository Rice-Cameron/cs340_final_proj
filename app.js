// App.js

/*
    SETUP
*/

var express = require('express');  
var app = express();            
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
PORT = 6731;              
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');    
app.engine('.hbs', engine({extname: ".hbs"})); 
app.set('view engine', '.hbs');                
 
// database
var db = require('./database/db-connector');
const e = require('express');

/*
    ROUTES
*/
app.get('/', function(req, res) {
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

app.get('/authors', function(req, res){
    res.render('authors')
})

app.get('/genres', function(req, res){
    res.render('genres')  
})

app.get('/publishers', function(req, res){
    res.render('publishers')
})

app.get('/reviews', function(req, res){
    res.render('reviews')
})

app.get('/users', function(req, res){
    res.render('users')
})

app.get('/books_authors', function(req ,res){
    res.render('books_authors')
})

app.get('/books_genres', function(req, res){
    res.render('books_genres')
})

app.get('/books_users', function(req, res){
    res.render('books_users')
})



app.post('/add-book-form', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO Books (isbn, title, publicationYear, copiesAvailable, publisherID) VALUES ('${data['input-isbn']}', '${data['input-title']}', '${data['input-pubyear']}', '${data['input-copies']}', '${data['input-pubID']}')`;
    db.pool.query(query1, function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400)
        }
        else{
            res.redirect('/');
        }
    })

})

app.put('/put-book-ajax', function(req,res,next){
    let data = req.body;
    
    let isbn = data.isbn
    let title = data.title
    let pubyear = data.publicationYear
    let copies = data.copiesAvailable
    let pubname = data.publisherName
  
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

app.delete('/delete-book-ajax/', function(req,res,next){
    let data = req.body;
    let isbn = data['isbn'];
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


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
