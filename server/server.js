var express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
var app = express();
const path = require('path'); 
var mongoose = require('mongoose');
 const Schema = mongoose.Schema
const PORT = process.env.PORT || 5000;

// const multer = require('multer');
// const uploadDirectory = 'uploads/'
// const upload = multer({ dest : uploadDirectory})

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extendedL: false
    })
)

const mongoURI = 'mongodb://localhost:127.0.0.1/my-blog'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        throw err;
    } else {
        console.log(`Successfully connected to `);
    }
});

mongoose
  .connect(mongoURI,  {useNewUrlParser: true})
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.log(err))


var Users = require('./routes/Users');
app.use('/users' , Users)


var Blogs = require('./routes/Blogs');
app.use('/blogs' , Blogs);


// const PersonModel = mongoose.model("blogs", {
//     categories: {
//         type: String
//     },
//     image: {
//         type: String,
//         required: true

//     },
//     is_local: {
//         type: String,
//         required: true

//     },
//     description: {
//         type: String
//     },
// });

// const BlogSchema = new Schema({
//     categories: {
//         type: String
//     },
//     image: {
//         type: String,
//         required: true

//     },
//     is_local: {
//         type: String,
//         required: true

//     },
//     description: {
//         type: String
//     },
// })

// app.post('/blogs' , (req,res)=>{
//     var person = new PersonModel(req.body);
//     var result =  person.save();
//     res.status(200).send(result)

    
// })




// app.post('/api' , upload.single('someFile'), (req,res)=>{
//     console.log('api is accessed');
//     // console.log(req.body.someText);
//     // console.log(req.file);

//     res.status(201).send({body:req.body , file:req.file})  
// })

// app.get('/images/:newFileName', (req,res)=>{
//     console.log('/images/:newFileName is accessed');

//     const fullPathFileName = path.join(
//     __dirname,
//      uploadDirectory,
//      req.params.newFileName
//      );

//     res.sendFile(fullPathFileName);
// })


app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});














































