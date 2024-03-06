const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')

router.use((req, res, next) => {
    next()
  })


router.get('/authors', (req, res) => {
   res.render('authors') 
})

module.exports = router