// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if (err) {
        return console.log('unable to connect to mongodb server');
    }
               console.log('connect to mongodb server');

        //    db.collection('Todos').findOneAndUpdate({
        //         _id: new ObjectID('5a6ecc586975507ba951784d')
        //    },{
        //      $set: {
        //          completed: true
        //      }  
        //    },{
        //        returnOriginal: false
        //    }).then((result) =>{
        //        console.log(result);
        //    });

        db.collection('user').findOneAndUpdate({
            _id: new ObjectID('5a6ec57435b6bb26dfb66dfb')
       },{
         $set: {
             name: 'Prasoon'
         }, 
         $inc: {
            age: -1
         } 
       },{
           returnOriginal: true
       }).then((result) =>{
           console.log(result);
       });

              db.close();
});