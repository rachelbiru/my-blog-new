var express = require('express');
const blogs = express();
const Blog = require("../models/Blog")


blogs.post('/', (req, res) => {
    const userData = new Blog({
        categories: req.body.categories,
        image: req.body.image,
        is_local: req.body.is_local,
        description: req.body.description,
        email :  req.body.email
          
    }) 
    userData
    .save()
    .then(result =>{
        // console.log(result);   
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
        // console.log(doc);
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err})
    })   
})



blogs.get("/:email" , (req,res,next) =>{
    console.log(req.params, "rachel biru ");

    const token = req.params.email;

    console.log(token);

    Blog.find({email: token})
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(201).json(doc)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err})
    })
})


blogs.delete("/:id", (req,res)=>{
 console.log(req.params,"deletedddddddddddd")
    const id = req.params.id;
   
    Blog.remove({_id:id})
     .exec()
     .then(result =>{
         res.status(200).json(result)
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({
             error:err
         })
         
     })
})

blogs.patch("/:id", (req,res)=>{
    const id = req.params.id;
    console.log(req.params)
   
    Blog.updateOne(
        {_id:id} ,
        {$set:{
        categories: req.body.categories,
        image: req.body.image,
        is_local: req.body.is_local,
        description: req.body.description  
    
    }})
    .exec()
    .then(result =>{
        console.log(req.body)
        console.log(result,"updata succes");
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
        
    })
})




module.exports = blogs;