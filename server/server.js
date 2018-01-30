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

App.listen(3000,() =>{
    console.log('using the 3000 port');
});

