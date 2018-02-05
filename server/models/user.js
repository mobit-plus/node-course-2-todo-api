var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var Userschema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: '{value} is not a valid email!'
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        unique: true
    },
    tokens:[{
       access:{
        type: String,
        required: true
       },
       token:{
        type: String,
        required: true
       }
    }]
});

Userschema.methods.toJSON = function () {
    var User = this;
    var userObject = User.toObject();
     
    return _.pick(userObject, ['_id', 'email']);
};

Userschema.methods.generateAuthToken = function () {
    var User = this;
    var access = 'auth';
    var token = jwt.sign({_id: User._id.toHexString(), access},'abc123').toString();

    User.tokens.push({access, token});

    return User.save().then(() => {
        return token;
    });
};

Userschema.statics.findByToken = function (token) {
    var User = this;
    var decodetoken;
     
    try {
        decodetoken = jwt.verify(token, 'abc123');
    } catch (er) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decodetoken._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

var User = mongoose.model('User', Userschema);



module.exports = {User};