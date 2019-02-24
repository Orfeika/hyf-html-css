let mysql = require('mysql2');
let config = require('./config.js');



let connection = mysql.createConnection(config);

function createUser(username, password, email) {

  connection.execute('INSERT INTO `user` VALUES (?,?,?)', [username, password, email], function (error, results, fields) {
    if (error) throw error;
    console.log(fields[0]);
  });
}

function createList(username) {
  connection.query('INSERT INTO `userlist` SET ?', { userName: username }, function (error, results, fields) {
    if (error) throw error;
    console.log(results.insertId);
  });
}


function createItem(listId, itemText) {
  connection.beginTransaction(function (err) {
    if (err) { throw err; }
    connection.query('INSERT INTO list SET ?', { listID: listId }, function (error, results, fields) {
      if (error) {
        return connection.rollback(function () {
          throw error;
        });
      }
      let itemId = results.insertId;
      connection.query('INSERT INTO item SET ?', { itemID: itemId, text: itemText }, function (error, results, fields) {
        if (error) {
          return connection.rollback(function () {
            throw error;
          });
        }
        connection.commit(function (err) {
          if (err) {
            return connection.rollback(function () {
              throw err;
            });
          }
          console.log('success!');
        });
      });
    });
  });
}


function createTag(tagName) {
  connection.query('INSERT INTO `tag` SET ?', { tagText: tagName }, function (error, results, fields) {
    if (error) throw error;
    console.log(results.insertId);
  });

}


function addTagToItem(tagName, itemId){
  connection.beginTransaction(function(err) {
    if (err) { throw err; }
    connection.query('SELECT tagID FROM tag WHERE ? order by tagID  DESC limit 1', { tagText: tagName }, function (error, fields) {
      if (error) {
        return connection.rollback(function() {
          throw error;
        });
      }
      let tagId = fields[0];
      tagId = tagId["tagID"];
  
      connection.query("UPDATE item SET isTaged= 'T' WHERE ?;", {itemID: itemId}, function (error, results, fields) {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        }

        connection.query('INSERT INTO `tagitem` SET ?', {itemID: itemId, tagID:tagId}, function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }

        connection.commit(function(err) {
          if (err) {
            return connection.rollback(function() {
              throw err;
            });
          }
          console.log('success!');
        });
      });
    });
  });

});
}

function deleteItem(itemId){
  connection.query("UPDATE item SET isDeleted= 'T' WHERE ?;", {itemID: itemId}, function (error, results, fields) {
    if (error) {
      return connection.rollback(function() {
        throw error;
      });
    }
    });
}


function markItemDone(itemId){
  connection.query("UPDATE item SET IsDone = 'T' WHERE ?;", {itemID: itemId}, function (error, results, fields) {
    if (error) {
      return connection.rollback(function() {
        throw error;
      });
    }
    });
}


function deletelist(listId){
  connection.query("UPDATE userlist SET isDeleted= 'T' WHERE ?;", {listID: listId}, function (error, results, fields) {
    if (error) {
      return connection.rollback(function() {
        throw error;
      });
    }
    });
}

module.exports.createUser = createUser;
module.exports.createList = createList;
module.exports.createItem = createItem;
module.exports.createTag = createTag;
module.exports.addTagToItem = addTagToItem;
module.exports.deleteItem = deleteItem;
module.exports.markItemDone = markItemDone;
module.exports.deletelist = deletelist;


