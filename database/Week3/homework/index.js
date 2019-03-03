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

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const user = require('./User/user')
const list = require('./list/list')


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
  response.json({ info: 'TODO API' })
})

app.use((err, req, res, next) => {
  if (err instanceof httpError) {
    return res.status(err.code).send(err.message);
  }
  res.sendStatus(500);
});

app.get('/users', user.getListOfUsers);
app.post('/users', user.postUser);
app.get('/users/:username', user.getUser);
app.get('/:username/lists', list.getUserLists);
app.post('/:username/lists', list.postList);
app.put('/:username/lists/:listId/addReminder', list.setReminder);
app.put('/:username/lists/:listId/delete', list.deleteList);
app.post('/:username/lists/:listId', list.postItem);
app.get('/:username/lists/:listId', list.getList);
app.post('/:username/lists/:listId/:itemId/:tagId', list.createTaggedItem);




