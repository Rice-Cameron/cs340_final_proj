// Brandons
const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')

router.use((req, res, next) => {
    next()
  })


router.get('/genres', (req, res) => {
   res.render('genres') 
})

module.exports = router