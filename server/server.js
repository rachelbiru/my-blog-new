var express = require('express');
const bodyParser = require('body-parser');
var app = express();
const path = require('path');
var mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

const multer = require('multer');
const uploadDirectory = 'uploads'
app.use(express.static(path.join(__dirname, uploadDirectory)))
mongoose.set('useFindAndModify', false);


const Blog = require("./models/Blog");


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
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))


var Users = require('./routes/Users');
app.use('/users', Users)


// var Blogs = require('./routes/Blogs');
// app.use('/blogs', Blogs);

var Comments = require('./routes/Comments');
app.use('/comments', Comments);

var Histories = require('./routes/Histories')
app.use('/history' , Histories);




const storage = multer.diskStorage({
    destination: uploadDirectory,
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage
});

app.post('/blogs', upload.single('someFile'), (req, res) => {
    console.log('api is accessed');

    const obj = new Blog({
        filename: req.file.filename,
        categories: req.body.categories,
        description: req.body.description,
        email: req.body.email,
    })
    obj.save()
    res.status(201).send(obj)
})



app.post('/blogs/:id', upload.single('someFile'), (req, res) => {
    console.log('api is accessed');
    const id = req.params.id;

    if (req.file) {
        var datarecord = {
            filename: req.file.filename,
            categories: req.body.categories,
            description: req.body.description,
            email: req.body.email,
        }
    } else {
        var datarecord = {
            categories: req.body.categories,
            description: req.body.description,
            email: req.body.email,
        }
    }

    const update = Blog.findByIdAndUpdate(id, datarecord)

    update.exec(function (err, data) {
        if (err) throw err;
    })
    res.status(201).redirect('/');
})



app.get('/images/:newFileName', (req, res) => {
    console.log('/images/:newFileName is accessed');

    const fullPathFileName = path.join(
        __dirname,
        uploadDirectory,
        req.params.newFileName
    );

    res.sendFile(fullPathFileName);
})


app.get("/blogs", (req, res, next) => {

    Blog.find().populate("comments")
        .exec()
        .then(doc => {
            // console.log(doc);
            res.status(200).send(doc)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})


app.get("/blogs/comments/:id", (req, res, next) => {

    const tokenid = req.params.id;
    console.log(tokenid);
    
    Blog.find({ _id: tokenid }).populate("comments")
        .exec()
        .then(doc => {
            // console.log(doc);
            doc.map(d => (
                //  console.log(d.comments)
                 res.status(200).send(d.comments)
            ))
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})



app.get("/blogs/:email", (req, res, next) => {
    console.log(req.params, "rachel biru ");

    const token = req.params.email;
    Blog.find({ email: token })
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})


app.get("/blogs/findById/:id", (req, res, next) => {
    console.log(req.params, "id");

    const tokenid = req.params.id;

    console.log(tokenid);
    Blog.find({ _id: tokenid })

        .exec()
        .then(doc => {
            console.log(doc);
            res.status(201).json(doc)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})



app.delete("/blogs/:id", (req, res) => {
    console.log(req.params, "deletedddddddddddd")
    const id = req.params.id;

    Blog.remove({ _id: id })
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



app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});














































