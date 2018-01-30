var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
    text:{
        type: String,
        required: true,
        minlenght: 2,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    }
});

// var newtodo = new Todo({
//     text: 'cook dinner',
// });

var newtodo = new Todo({
    text: ' Hi Prasoon ',
    completed: 'ture'
});

newtodo.save().then((docs) =>{
    console.log(JSON.stringify(docs, undefined ,2));
},(err) =>{
    console.log(err);
});