// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if (err) {
        return console.log('unable to connect to mongodb server');
    }
               console.log('connect to mongodb server');

            // db.collection('Todos').find({
            //     _id: new ObjectID('5a6ecc586975507ba951784d')
            // }).toArray().then((docs) => {
            //     console.log('Todos');
            //     console.log(JSON.stringify(docs, undefined, 2));

            // },(err) => {
            //     console.log('Unable to fetch Todos!', err);
            // });

            // db.collection('Todos').find().count().then((count) => {
            //         console.log(`Todos count:${count}`);
            //         // console.log(JSON.stringify(docs, undefined, 2));
    
            //     },(err) => {
            //         console.log('Unable to fetch Todos!', err);
            //     });

            db.collection('user').find().count().then((count) =>{
                //console.log(JSON.stringify(docs, undefined, 2));
                console.log(`user count:${count}`);

            },(err) =>{
                console.log('Unable to user find!');
            });

              db.close();
});