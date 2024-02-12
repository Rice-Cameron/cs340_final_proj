const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const fs = require("fs")

const budgetData = require('./budgetData.json')
console.log("==== DATA:", budgetData)
const app = express()
const port = process.env.PORT || 3000

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('static'))
app.use(express.json())

// app.get('/', function (req, res, next) {
//     console.log('GET request received at /');
//     if () {
//         res.status(200).render('', )
//     }
//     else {
//         next()
//     }
// })

// ROUTE FOR ADD BOOK

// ROUTE FOR VIEW BOOKS

// ROUTE FOR PROFILE - USERS CURRENTLY CHECKED OUT BOOKS

app.get("*", function (req, res, next) {
    console.log('GET request received at *');
    res.status(404).render('404')
})

app.listen(port, function () {
    console.log(`Server is listening on port ${port}`)
})