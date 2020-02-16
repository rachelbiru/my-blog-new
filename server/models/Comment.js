const mongoose = require('mongoose');
const Schema = mongoose.Schema


const CommentSchema = new Schema({
 
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

})


module.exports = Comment = mongoose.model('comment', CommentSchema)