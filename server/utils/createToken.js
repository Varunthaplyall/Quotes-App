const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

module.exports.createToken = (data)=>{
    return jwt.sign(data,JWT_SECRET, {
        expiresIn : '1d'
    } )
}