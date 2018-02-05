const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
    id: 12
};

var token = jwt.sign(data, '1111111');
console.log(token);

var decodetoken = jwt.verify(token, '1111111');
console.log(decodetoken);

// var message = 'i m prasoon';
// var hash = SHA256(message).toString();
 
// console.log('message:',message);
// console.log('hash:',hash);

// var data = {
//     id: 3
// };

// var token= {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// var result = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(result === token.hash) {
//     console.log('data was not changed.');
// } else {
//     console.log('data was changed.');
// }