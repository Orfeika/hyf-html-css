const bcrypt = require('bcrypt');
let mysql = require('mysql2');
let config = require('./config.js');



let connection = mysql.createConnection(config);
 
let sql = `select * from user`;
 
connection.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results[0]);
});


function encryptPassword(password){
    bcrypt.hash(password, 10, function(err, hash) {
        if(err) return err;
        return hash ;
    });
}

let hash1 = encryptPassword("pass");
console.log(hash1);

// bcrypt.compare('myPassword', hash, function(err, res) {
//     if(res) {

//     console.log("true");
//     } else {
//      // Passwords don't match
//     } 
//   });