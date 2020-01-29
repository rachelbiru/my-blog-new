var express = require('express');
const blogs = express();
const Blog = require("../models/Blog")


blogs.post('/', (req, res) => {
    console.log('/blogs/blog');

    const userData = new Blog({
        categories: req.body.categories,
        image: req.body.image,
        is_local: req.body.is_local,
        description: req.body.description,
          
    }) 
    userData
    .save()
    .then(result =>{
        console.log(result);   
    })
    .catch(err => console.log(err) )
     res.status(201).json({
         message: 'create!!!!!!!!!!!!!!!!!!'
         
     })
})

blogs.get("/" , (req,res,next) =>{
    Blog.find()
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err})
    })

      
})




module.exports = blogs;