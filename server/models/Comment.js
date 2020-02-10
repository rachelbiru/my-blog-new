const mongoose = require('mongoose');
const Schema = mongoose.Schema


const CommentSchema = new Schema({
 
   
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },

    text: {
        type: String,
    },

})


module.exports = Comment = mongoose.model('comment', CommentSchema)