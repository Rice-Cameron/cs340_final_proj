// App.js

/*
    SETUP
*/
PORT = 6733;
var express = require('express');
var app = express();

var db = require('./database/db-connector');

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({ extname: ".hbs" }));
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

/* 
    ROUTES
*/
const booksRoute = require('./routes/books')
const authorsRoute = require('./routes/authors')
const genresRoute = require('./routes/genres')
const publishersRoute = require('./routes/publishers')
const reviewsRoute = require('./routes/reviews')
const usersRoute = require('./routes/users')
const booksAuthorsRoute = require('./routes/books_authors')
const booksGenresRoute = require('./routes/books_genres')
const booksUsersRoute = require('./routes/books_users')
app.use('/', booksRoute)
app.use('/', authorsRoute)
app.use('/', genresRoute)
app.use('/', publishersRoute)
app.use('/', reviewsRoute)
app.use('/', usersRoute)
app.use('/', booksAuthorsRoute)
app.use('/', booksGenresRoute)
app.use('/', booksUsersRoute)


/*
    ROUTES
*/
app.get('/', function (req, res) {
    res.render('index');
});


/*
    LISTENER
*/
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
