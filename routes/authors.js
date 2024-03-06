// Camerons
const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')

router.use((req, res, next) => {
    next()
  })


router.get('/authors', (req, res) => {
   res.render('authors') 
})



router.get('/authors', function(req, res) {
  let query1 = "SELECT * FROM Authors;";

  
  db.pool.query(query1, function(error, rows, fields){
    let 
    return res.render('books', {data: books, publishers: publishers});
  })
});

router.post('/add-book-form', function(req, res){
  let data = req.body;

  query1 = `INSERT INTO Books (isbn, title, publicationYear, copiesAvailable, publisherID) VALUES ('${data['input-isbn']}', '${data['input-title']}', '${data['input-pubyear']}', '${data['input-copies']}', '${data['input-pubID']}')`;
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

module.exports = router