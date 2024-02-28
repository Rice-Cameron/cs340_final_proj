// App.js

/*
    SETUP
*/

var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
PORT = 6731;                 // Set a port number at the top so it's easy to change in the future
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// database
var db = require('./database/db-connector')

/*
    ROUTES
*/
app.get('/', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.title === undefined)
    {
        query1 = "SELECT * FROM Books;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Books WHERE title LIKE "${req.query.title}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Publishers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the books
        let books = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            // Save the publishers
            let publishers = rows;

            let pubmap = {}
            publishers.map(publisher => {
                let id = parseInt(publisher.publisherID, 10);

                pubmap[id] = publisher["publisherName"];
            })

            books = books.map(book => {
                return Object.assign(book, {publisherID: pubmap[book.publisherID]})
            })
            
            return res.render('index', {data: books, publishers: publishers});
        })
    })
});


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

app.delete('/delete-book-ajax/', function(req,res,next){
    let data = req.body;
    let isbn = data['isbn'];
    let deleteBooksAuthors = `DELETE FROM Books_Authors WHERE isbn = ?`
    let deleteBooksGenres = `DELETE FROM Books_Genres WHERE isbn = ?`
    let deleteBooksUsers = `DELETE FROM Books_Users WHERE isbn = ?`
    let deleteBook = `DELETE FROM Books WHERE isbn = ?`;
    
  
  
          // Run the 1st query
          db.pool.query(deleteBooksAuthors, [isbn], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
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
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
