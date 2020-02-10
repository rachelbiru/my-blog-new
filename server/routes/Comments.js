var express = require('express');
const comments = express();
const Comment = require("../models/Comment")
const Blog = require("../models/Blog")



comments.post('/:id', (req, res) => {
      console.log(req.params.id)
    // let retailerID = `${retailer._id}`
    // let name = req.body.name
    // let email =  req.body.email
    // let text =  req.body.text
    // const comments1 = {name: name, email: email, text: text }

     const newComment = new Comment({
        name : req.body.name,
        email: req.body.email,
        text: req.body.text
     })

     newComment.save();

    Blog.findById(req.params.id, function(err, foundBlog){
       console.log(foundBlog)
       foundBlog.comments.push(newComment);
        foundBlog.save();

    })

    // var CommentUser = new Comment({
    //     name: req.body.name,
    //     email: req.body.email,
    //     text: req.body.text,
    // }) 

    // CommentUser
    // .save()
    // .then(result =>{
    //     console.log(result);   
    // })
    // .catch(err => console.log(err) )
    //  res.status(201).json({
    //      message: 'create!!!!!!!!!!!!!!!!!!'
    //  })
})



comments.get("/:id" , (req,res,next) =>{
    Comment.find()
    .select("blogs quantity _id")
    .populate('blogs')
    .exec()
    .then(doc =>{
        // console.log(doc);
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err})
    })   
})




module.exports = comments;