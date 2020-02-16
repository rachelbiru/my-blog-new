const mongoose = require('mongoose');
const Schema = mongoose.Schema


const HistorySchema = new Schema({

    titleBlog: {
        type: String,
    },
    type: {
        type: String,
    },

    date: {
         type: String,
    },
    email: {
        type: String,
        required: true
    }

})


module.exports = History = mongoose.model('history', HistorySchema)