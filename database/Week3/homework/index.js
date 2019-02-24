
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const db = require('./endpoints.js');
const port = 3001


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and  MySql API' })
})

app.get('/users', db.getUsers)
app.post('/users', db.createUser)



// const bcrypt = require('bcrypt');

// bcrypt.hash('myPassword', 10, function(err, hash) {

//     console.log(hash);

// });

// let hash = '$2b$10$3MZEO4YctgQp/eaXfBjT.uUg2ou537LMeGiUwp8fmrrmwAWlqVOom';

// bcrypt.compare('myPassword', hash, function(err, res) {
//     if(res) {

//     console.log("true");
//     } else {
//      // Passwords don't match
//     } 
//   });