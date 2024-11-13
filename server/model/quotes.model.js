const mongoose = require('mongoose')

const quotesSchema = mongoose.Schema({
    text : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Types.ObjectId,
        ref : "Users"
    },
},{
    timestamps : true 
})

module.exports = mongoose.model('Quote', quotesSchema);
