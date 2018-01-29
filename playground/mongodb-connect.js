// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

// var user = {name:'prasoon',age:23};
// var {name,age} = user;
// console.log(name,age);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if (err) {
        return console.log('unable to connect to mongodb server');
    }
               console.log('connect to mongodb server');

            // db.collection('Todos').insertOne({
            //     text: 'something to do',
            //     completed: false
            // }, (err, res) =>{
            //     if (err) {
            //         return console.log('Unable to insert todo', err);
            //     }

            //     console.log(JSON.stringify(res.ops, undefined, 2));
            // });

            // db.collection('user').insertOne({
            //     name: 'Prasoon',
            //     age: 23,
            //     location: 'Indore M.P',
            //     Address: 'New Palasia'
            // },(err, result) =>{
            //     if (err) {
            //         return console.log('Unable to insert user!');
            //     }
            //                 console.log(result.ops[0]._id.getTimestamp());
            // });

               db.close();
});