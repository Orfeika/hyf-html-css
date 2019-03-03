let connection = require('../config.js');




const createUserDB = (username, password, email) => {
    return new Promise((resolve, reject) => {
        connection.execute('INSERT INTO `user` VALUES (?,?,?)', [username, password, email], function (error, results, fields) {
            if (error) reject(error);
            resolve(`User  ${username} inserted`)
        });
    }

    )
};


const postUser = (request, response) => {
    const { username, password, email } = request.body;
    if(!request.body==null){
        console.log("Here")
        createUserDB(username, password, email)
        .then((results) => { return response.status(200).json(results) })
        .catch((error) => { return response.status(404).json(error) });
    } else{
        console.log(request);
        return response.status(500).json("Something went wrong");

    }

};



const getUsersFromDb = new Promise(
    (resolve, reject) => {
        connection.query('select userName, email from  user', (error, results, fields) => {
            if (error) {
                reject(error);
            }
            resolve(results)

        })
    }

);

const getUserFromDb = (username) => {
    return new Promise(
        (resolve, reject) => {
            connection.query('select userName, email from  user where userName =?', [username], (error, results, fields) => {
                if (error) {
                    reject(error);
                }
                resolve(results)

            })
        }

    );
}


const getListOfUsers = (request, response) => {
    getUsersFromDb
        .then((results) => { return response.status(200).json(results) })
        .catch((error) => { return response.status(404).json(error) });
}


const getUser = (request, response) => {
    const username = request.params.username;

    getUserFromDb(username)
        .then((results) => { return response.status(200).json(results) })
        .catch((error) => { return response.status(404).json(error) });
}

module.exports = {
    getUser,
    postUser,
    getListOfUsers
}