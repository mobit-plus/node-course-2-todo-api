// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if (err) {
        return console.log('unable to connect to mongodb server');
    }
               console.log('connect to mongodb server');

            // deleteMany
            // db.collection('Todos').deleteMany({text: 'work is worship'}).then((result) =>{
            //     console.log(result);
            // });

            // deleteOne

            // db.collection('Todos').deleteOne({text:'work is worship'}).then((res) =>{
            //     console.log(res);
            // });

            //findOneAndDelete

            // db.collection('Todos').findOneAndDelete({completed: 'false'}).then((res) =>{
            //     console.log(res);
            // });


            // db.collection('user').deleteMany({name: 'aamin'}).then((res) =>{
            //     console.log(res);
            // });

            db.collection('user').findOneAndDelete({
                _id: new ObjectID('5a6ec56b33f49a26cdd748c4')
            }).then((res) =>{
                console.log(JSON.stringify(res, undefined, 2));
            });


              db.close();
});