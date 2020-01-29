const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    categories: {
        type: String
    },
    image: {
        type: String,

    },
    is_local: {
        type: String,

    },
    description: {
        type: String
    },
})

module.exports = Blog = mongoose.model('blogs', BlogSchema)