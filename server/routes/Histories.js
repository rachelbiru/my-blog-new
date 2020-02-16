var express = require('express');
const histories = express();
const History = require("../models/History")


histories.post('/', (req, res) => {
    console.log('history is accessed');

    const obj = new History({
        titleBlog: req.body.titleBlog,
        type: req.body.type,
        date: req.body.date,
        email: req.body.email
    })

    obj.save()
    res.status(201).send(obj)
})



histories.get("/:email", (req, res, next) => {
    
    const token = req.params.email;
    History.find({ email: token })

        .exec()
        .then(doc => {
            // console.log(doc);
            res.status(201).json(doc)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})

module.exports = histories;
