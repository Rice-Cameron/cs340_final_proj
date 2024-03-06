const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')

router.use((req, res, next) => {
    next()
  })


router.get('/users', (req, res) => {
   res.render('users') 
})

module.exports = router