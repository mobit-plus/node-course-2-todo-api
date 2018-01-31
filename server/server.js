var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var App = express();

App.use(bodyParser.json());
App.post('/todos',(req, res) =>{
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((docs) =>{
        res.send(docs);
    },(err) =>{
        res.status(400).send(err);
    });
});

App.get('/todos',(req,res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    },(er) =>{
        if (er){
            res.status(400).send(er);
        }
    });
});

App.listen(3000,() => {
    console.log('using the 3000 port');
});

module.exports = {App};