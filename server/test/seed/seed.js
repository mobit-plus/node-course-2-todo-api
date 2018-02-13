const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

var userOneid = ObjectID();
var userTwoid = ObjectID();

const users = [{
    _id: userOneid,
    email: 'mobit@gmail.com',
    password: 'onepass',
    tokens:[{
        access: 'auth',
    token: jwt.sign({_id: userOneid, access: 'auth'}, 'abc123').toString()
    }]
},{
    _id: userTwoid,
    email: 'mike@gmail.com',
    password: 'towpass',
    tokens:[{
        access: 'auth',
    token: jwt.sign({_id: userTwoid, access: 'auth'}, 'abc123').toString()
    }]
}];

const todos = [{
    _id: new ObjectID(),
    text: 'first text',
    _creator: userOneid
},{
    _id: new ObjectID(),
    text: 'second text',
    completed: true,
    completedAt: 333,
    _creator: userTwoid
}];

var populateTodos = (done) => {
    Todo.remove({}).then(() => { //err,res
        return Todo.insertMany(todos);
    }).then(() => done());
};

var populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).catch(() => done());
};

module.exports = {todos, populateTodos,users,populateUsers};