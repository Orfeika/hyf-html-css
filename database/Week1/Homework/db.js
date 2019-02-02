let mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



function executeQuery(query){
  connection.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}

function insertValuesToTable(tableName, values){
  connection.query(`INSERT INTO ${tableName} VALUES ?;`, [values], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}






module.exports.connection = connection;
module.exports.executeQuery = executeQuery;
module.exports.insertValuesToTable = insertValuesToTable;

