let connection = require('../config.js');


const getListsDB = (username) => {
    return new Promise((resolve, reject) => {
        connection.execute(`SELECT username, listID FROM list where userName = ? AND IsDeleted  = 'F'`, [username], (error, results) => {
            if (error) reject(error);
            resolve(results);
        })
    });
}

const getUserLists = (request, response) => {
    const username = request.params.username;
    getListsDB(username)
        .then((results) => { response.status(200).json(results) })
        .catch((error) => { return response.status(404).json(error) })
}

const createListDB = (username) => {
    return new Promise((resolve, reject) => {
        connection.execute(`INSERT INTO list(username) values (?)`, [username], (error, results) => {
            if (error) reject(error);
            resolve(results);
        })
    });
}

const postList = (request, response) => {
    const username = request.params.username;
    createListDB(username)
        .then((results) => { return response.status(200).json(results) })
        .catch((error) => { return response.status(500).json(error) });

}

const updateReminderDB = (username, listId, date) => {
    return new Promise((resolve, reject) => {
        connection.execute(`UPDATE  list SET reminder = ? WHERE listID = ? AND userName = ?`, [date, listId, username], (error, results) => {
            if (error) reject(error);
            resolve(results);
        })
    });
}

const setReminder = (request, response) => {
    const username = request.params.username;
    const listId = parseInt(request.params.listId);
    const { date } = request.body;
    console.log(date);

    updateReminderDB(username, listId, date)
        .then((results) => { return response.status(200).json(results) })
        .catch((error) => { return response.status(500).json(error) });
}


const deleteListDB = (username, listId) => {
    return new Promise((resolve, reject) => {

        connection.execute(` update list SET isDeleted = 'T' WHERE listID = ? AND userName = ?`, [listId, username], (error, results) => {
            if (error) reject(error);
            resolve(results);
        })
    });
}

const deleteList = (request, response) => {
    const username = request.params.username;
    const listId = parseInt(request.params.listId);
    deleteListDB(username, listId)
        .then((results) => { return response.status(200).json(results) })
        .catch((error) => { return response.status(500).json(error) });
}


const addItemToListDB = (text, listId) => {
    return new Promise((resolve, reject) => {
        connection.execute(`INSERT INTO item (listID, text) values(?, ?)`, [listId, text], (error, results) => {
            if (error) reject(error);
            resolve(results);
        })
    });
}

const postItem = (request, response) => {
    const listId = parseInt(request.params.listId);
    const { text } = request.body;
    addItemToListDB(text, listId)
        .then((results) => { return response.status(200).json(results) })
        .catch((error) => { return response.status(500).json(error) });
}


const getListItemsDB = (listId) => {
    return new Promise((resolve, reject) => {
        connection.execute(`Select i.text, tag.tagText, i.listID, i.itemID
        from item as i
        left outer join tagitem on i.itemID = tagitem.ItemID
        left outer join tag on tag.tagID =tagitem.tagID
        WHERE   i.IsDeleted = 'F' AND  i.listID = ?`, [listId], (error, results) => {
                if (error) reject(error);
                resolve(results);
            })
    });
}

function listPrettier(data) {
    let output = [];
    data.forEach((item) => {
        let existing = output.filter((v, i) => {
            return v.itemID == item.itemID;
        });
        if (existing.length) {
            let existingIndex = output.indexOf(existing[0]);
            output[existingIndex].tagText = output[existingIndex].tagText.concat(item.tagText);
        } else {
            if (typeof item.tagText == 'string') {
                item.tagText = [item.tagText];
                output.push(item);
            } else if (item.tagText == null) {
                item.tagText = "";
                output.push(item);
            }

        }
    })

    return output;

}

const getList = (request, response) => {
    const listId = parseInt(request.params.listId);
    getListItemsDB(listId)
        .then((results) => {
            console.log(results)
            let output = listPrettier(results)
            return response.status(200).json(output)
        })
        .catch((error) => { return response.status(404).json(error) });
}


const markAsDoneDB = (itemID) => {
    return new Promise((resolve, reject) => {
        connection.execute(`UPDATE  item SET isDone = 'T' WHERE itemID = ?`, [itemID], (error, results) => {
            if (error) reject(error);
            resolve(results);
        })
    });
}

const setItemAsDone = (request, response) => {
    const itemID = parseInt(request.params.itemID);
    markAsDoneDB(itemID)
        .then((results) => { return response.status(200).json(results) })
        .catch((error) => { return response.status(404).json(error) });
}

const markAsDeletedDB = (itemID) => {
    return new Promise((resolve, reject) => {
        connection.execute(`UPDATE  item SET isDone = 'T' WHERE itemID = ?`, [itemID], (error, results) => {
            if (error) reject(error);
            resolve(results);
        })
    });
}

const deleteItem = (request, response) => {
    const itemID = parseInt(request.params.itemID);
    markAsDeletedDB(itemID)
        .then((results) => { return response.status(200).json(results) })
        .catch((error) => { return response.status(500).json(error) });
}


const addTagDB = (text) => {
    return new Promise((resolve, reject) => {
        connection.execute(`INSERT INTO tag (tagText) values(?)`, [text], (error, results) => {
            if (error) reject(error);
            resolve(results);
        })
    });
}

const addTag = (request, response) => {
    const listId = parseInt(request.params.listId);
    const { text } = request.body;
    addTagDB(text)
        .then((results) => { return response.status(200).json(results) })
        .catch((error) => { return response.status(500).json(error) });
}



const getTagsDB = (text) => {
    return new Promise((resolve, reject) => {
        connection.execute(`SELECT * FROM tagItem`, [text], (error, results) => {
            if (error) reject(error);
            resolve(results);
        })
    });
}


const setTaggedState = (itemId, listId) => {
    return new Promise((resolve, reject) => {
        connection.execute(`UPDATE  item SET isDone = 'T' WHERE itemID = ? AND listID = ?`, [itemId, listId], (error, results) => {
            if (error) reject(error);
            resolve(results);
        })
    });
}

const addTagToItemDB = (itemId, tagId) => {
    return new Promise((resolve, reject) => {
        connection.execute(`INSERT INTO tagitem (ItemID, tagID) values(?,?)`, [itemId, tagId], (error, results) => {
            if (error) reject(error);
            resolve(results);
        })
    });
}

const createTaggedItemDB = (listId, itemId, tagId) => {
    return Promise.all([addTagToItemDB(itemId, tagId), setTaggedState(itemId, listId)]);
    
}

const createTaggedItem = (request, response) => {

    const listId = parseInt(request.params.listId);
    const itemId = parseInt(request.params.itemId);
    const tagId = parseInt(request.params.tagId);
    console.log(listId + " " + itemId + " "+ tagId);
    createTaggedItemDB(listId, itemId, tagId)
        .then((results) => { return response.status(200).json(results) })
        .catch((error) => {
            return response.status(500).json(error) });
}




module.exports = {
    getUserLists,
    postList,
    setReminder,
    deleteList,
    postItem,
    getList,
    setItemAsDone,
    deleteItem,
    addTag,
    createTaggedItem
}