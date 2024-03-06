const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')

router.use((req, res, next) => {
    next()
  })


router.get('/publishers', (req, res) => {
   res.render('publishers') 
})

module.exports = router