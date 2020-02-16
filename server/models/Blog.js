const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({

    filename: {
        type: String,

    },
    categories: {
        type: String,
         required: true

    },

    description: {
        type: String,
         required: true

    },
    email: {
        type: String,
        required: true
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "comment"}]
})


module.exports = Blog = mongoose.model('blog', BlogSchema)