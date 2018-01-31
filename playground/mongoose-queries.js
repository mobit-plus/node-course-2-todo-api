const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5a71b5ef5799b02e197bc20d1';

// if (!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
 
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         console.log('Unable to find id!');
//     }
//     console.log('Todo By Id', todo);
// }).catch((er) => console.log(er));

if (!ObjectID.isValid('5a703d94a4e41f2bf49967cd')) {
    console.log('user id not valid');
}

User.findById('5a703d94a4e41f2bf49967cd').then((user) => {
    if (!user) {
        return console.log('Unable to find user');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((er) => console.log(er));