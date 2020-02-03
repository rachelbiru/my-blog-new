const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    categories: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true

    },
    is_local: {
        type: String,


    },
    description: {
        type: String,
        required: true

    },

    email: {
        type: String,
        required: true
    }
})

module.exports = Blog = mongoose.model('blogs', BlogSchema)