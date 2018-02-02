const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var App = express();
const port = process.env.PORT || 3000;

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

App.get('/todos/:id',(req,res) => {
   // res.send(req.params);
   var id = req.params.id;

   if (!ObjectID.isValid(id)) {
       res.status(404).send();
   }

   Todo.findById(id).then((todo) => {
    if (!todo) {
        res.status(404).send();
    }

    res.send({todo});

   }).catch((er) => {
       res.status(400).send();
   });
});

App.delete('/todos/:id', (req,res) => {
    var id = req.params.id;
     
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
     
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((er) => {
        res.status(400).send();
    });
});

App.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body},{new:true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((er) => {
        res.status(400).send();
    });
});

App.listen(port,() => {
    console.log(`Started up at ${port}`);
});

module.exports = {App};