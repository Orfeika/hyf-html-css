const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const db = require('./queries.js');
const port = 3000
let mysql = require('mysql2');
let config = require('./config.js');
let connection = mysql.createConnection(config);



const getUsers = (request, response) => {
  connection.query('SELECT * FROM user ', (error, results, fields) => {
    if (error) {
      throw error
    }
    console.log(results)
    response.status(200).json(results)
  })
}


const createUser =(request, response)=> {

  const {username, password, email} = request.body;

  console.log(username)
  console.log(password)
  console.log(email)
  
  connection.execute('INSERT INTO `user`(userName, userHashedPassword, email) VALUES (?,?,?)', [username, password, email], function (error, results, fields) {
    if (error) {throw error;}
   response.status(201).send(`User added with ID: ${results}`)
    console.log(results);
  });
}

module.exports = {
  getUsers,
  // getUserById,
   createUser,
  // updateUser,
  // deleteUser,
}