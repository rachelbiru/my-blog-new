var express = require('express');
const comments = express();
const Comment = require("../models/Comment")
const Blog = require("../models/Blog")



comments.post('/:id', (req, res) => {
      console.log(req.params.id)

     const newComment = new Comment({
        name : req.body.name,
        email: req.body.email,
        text: req.body.text
     })

    newComment.save();

    Blog.findById(req.params.id, function(err, foundBlog){
    
       foundBlog.comments.push(newComment);
        foundBlog.save();
        res.status(201).send(newComment);

        if(err){
            console.log(err)
        }
    })

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



comments.delete("/:id" , (req,res,next) =>{
    const id = req.params.id
    Comment.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })

        })   
})


comments.patch("/:id", (req,res)=>{
    const id = req.params.id;

    Comment.updateOne(
        {_id:id} ,
        {$set:{
        name: req.body.name,
        text: req.body.text,
 
    }})
    .exec()
    .then(result =>{
        console.log(req.body)
        console.log(result,"updata succes");
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    })

})

module.exports = comments;