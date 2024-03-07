// Camerons
const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')

router.use((req, res, next) => {
    next()
  })


router.get('/users', (req, res) => {
    let query1 = "SELECT * FROM Users;"
    db.pool.query(query1, function(error, rows, fields){
        return res.render('users', {data: rows})
    })
})

router.post('/add-user-form', (req, res) => {
    let data = req.body
    // address and phoneNumber can be null, so we need to check for that
    if(data["input-address"] === ""){
        data["input-address"] = null
    }
    if(data["input-phoneNumber"] === ""){
        data["input-phoneNumber"] = null
    }
    let query1;
    // if address is null, don't insert
    if(data["input-address"] == null){
        query1 = `INSERT INTO Users (name, email, phoneNumber) 
                VALUES 
                ('${data["input-name"]}', '${data["input-email"]}', '${data["input-phoneNumber"]}')`
    }
    // if phoneNumber is null, don't insert
    else if(data["input-phoneNumber"] == null){
        query1 = `INSERT INTO Users (name, address, email) 
                VALUES 
                ('${data["input-name"]}', '${data["input-address"]}', '${data["input-email"]}')`
    }
    // if both are null, don't insert
    else if(data["input-address"] == null && data["input-phoneNumber"] == null){
        query1 = `INSERT INTO Users (name, email) 
                VALUES 
                ('${data["input-name"]}', '${data["input-email"]}')`
    }
    // if both are not null, insert all
    else{
        query1 = `INSERT INTO Users (name, address, email, phoneNumber) 
                VALUES 
                ('${data["input-name"]}', '${data["input-address"]}', 
                '${data["input-email"]}', '${data["input-phoneNumber"]}')`
    }
    db.pool.query(query1, function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400)
        }
        else{
            res.redirect('/users')
        }
    })
})

router.delete('/delete-user-ajax/', (req, res) => {
  let data = req.body
    let query = `DELETE FROM Users WHERE userID = ?`
    db.pool.query(query, [data.userID], function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400)
        }
        else{
            res.sendStatus(204)
        }
    })
})


module.exports = router