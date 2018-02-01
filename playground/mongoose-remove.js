const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res) => {
//     console.log(res);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// Todo.findOneAndRemove({_id: '5a72ec431457a827b6064c26' }).then((todo) => {
//     console.log(todo);
// });

Todo.findByIdAndRemove('5a72ec431457a827b6064c26').then((todo) => {
    console.log(todo);
});