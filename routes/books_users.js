const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')

router.use((req, res, next) => {
    next()
  })


router.get('/books_users', (req, res) => {
   res.render('books_users') 
})

module.exports = router