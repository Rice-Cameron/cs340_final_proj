// Camerons
const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')

router.use((req, res, next) => {
    next()
  })


router.get('/books_users', (req, res) => {
    let query1 = "SELECT * FROM Books_Users";
    let query2 = "SELECT * FROM Books";
    let query3 = "SELECT * FROM Users";

    db.pool.query(query1, function(error, rows, fields){
        let booksUsers = rows;
        for (let i = 0; i < booksUsers.length; i++) {
            booksUsers[i].dateBorrowed = booksUsers[i].dateBorrowed.toISOString().split('T')[0];
            if (booksUsers[i].dueDate != null){
                booksUsers[i].dueDate = booksUsers[i].dueDate.toISOString().split('T')[0];
            }
        }
        db.pool.query(query2, function(error, rows, fields){
            let books = rows;

            db.pool.query(query3, function(error, rows, fields){
                let users = rows;

                // Map isbn to a title
                let bookmap = {}
                books.map(book => {
                    let isbn = book.isbn;
                    bookmap[isbn] = book["title"];
                })

                // Map userID to a name
                let usermap = {}
                users.map(user => {
                    let id = parseInt(user.userID, 10);
                    usermap[id] = user["name"]
                })

                books = books.map(book => {
                    return Object.assign(book, {title: bookmap[book.isbn]})
                })

                users = users.map(user => {
                    return Object.assign(user, {name: usermap[user.userID]})
                })

                booksUsers = booksUsers.map(bu => {
                    return Object.assign(bu, {userID: usermap[bu.userID]})
                })
                return res.render('books_users', { data: booksUsers, books: books, users: users });
            })
        })
    })
})

router.post('/add-books-users-form', (req, res) => {
    let data = req.body;
    let query1

    // check if due date is empty
    if (data.dueDate === '') {
        data.dueDate = null;
    }

    let user = `SELECT userID FROM Users where userID = '${data["input-userID"]}'`
    db.pool.query(user, function(error, rows, fields){
        let userID  = rows[0].userID
        let book = `SELECT isbn FROM Books where isbn = '${data["input-isbn"]}'`
        db.pool.query(book, function(error, rows, fields){
            let isbn = rows[0].isbn
            if (data.dueDate == null){
                query1 = `INSERT INTO Books_Users (isbn, userID, dateBorrowed) VALUES ('${isbn}', '${userID}', '${data["input-dateBorrowed"]}')`
            }
            else{
                query1 = `INSERT INTO Books_Users (isbn, userID, dateBorrowed, dueDate) VALUES ('${isbn}', '${userID}', '${data["input-dateBorrowed"]}', '${data["input-dueDate"]}')`
            }
            db.pool.query(query1, function(error, rows, fields){
                if (error) {
                    res.status(500).send(error);
                } else {
                    res.redirect('/books_users');
                }
            })
        })
    });
})

router.delete('/delete-books-users-ajax/', (req, res) => {
    let data = req.body;
    let query = `DELETE FROM Books_Users WHERE borrowingID = ?`;
    db.pool.query(query, [data.borrowingID], function(error, rows, fields){
        if(error){
            res.status(500).send(error);
        }
        else{
            res.status(204).send();
        }
    })
})

module.exports = router