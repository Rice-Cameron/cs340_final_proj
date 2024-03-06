// Brandons
const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')

router.use((req, res, next) => {
    next()
  })


router.get('/reviews', (req, res) => {
   res.render('reviews') 
})

module.exports = router