var express = require('express');
// const cors = require('cors')
const bodyParser = require('body-parser');
var app = express();
const path = require('path');
var mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

const multer = require('multer');
const uploadDirectory = 'uploads'
// const upload = multer({ dest : uploadDirectory})
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


var Blogs = require('./routes/Blogs');
app.use('/blogs', Blogs);

var Comments = require('./routes/Comments');
app.use('/comments', Comments);


const storage = multer.diskStorage({
    destination: uploadDirectory,
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage
});


app.post('/api', upload.single('someFile'), (req, res) => {
    console.log('api is accessed');

    const obj = new Blog({
        filename: req.file.filename,
        categories: req.body.categories,
        description: req.body.description,
        email: req.body.email,
    })

    // obj.comments.push(req.body.comments);

    obj.save()
    res.status(201).send(obj)
})


app.post('/api/:id', upload.single('someFile'), (req, res) => {
    console.log('api is accessed');
    const id = req.params.id;
    // console.log(req.params)

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
    console.log('befor update');


    const update = Blog.findByIdAndUpdate(id, datarecord)
    console.log('after update');


    update.exec(function (err, data) {
        if (err) throw err;
    })
    res.status(201).redirect('/');
})



// app.post('/api/:id', upload.single('someFile'), (req, res) => {
//     console.log(req.params.id);    
//     const id = req.params.id;
//     console.log('push')

//     Blog.findByIdAndUpdate(JSON.parse({ _id: id }, { $push: { "products": { name: req.body.dataProduct.name } } }), { safe: true }, function (err, response) {
//         console.log('push!!!')

//         if (err) throw err;

//         console.log('finish')

//          res.json.parse({response});
//     });
// });


// app.post('/api/add', function (req, res) {
//     var object = {
//       "name": "John",
//       "age": "21"
//     };

//     Blog.create(object, function(err, result) {
//       if (err) {
//         res.send(err);
//       } else {
//         console.log(result);
//         res.send(result);
//       }
//     });
//   });



app.get('/images/:newFileName', (req, res) => {
    console.log('/images/:newFileName is accessed');

    const fullPathFileName = path.join(
        __dirname,
        uploadDirectory,
        req.params.newFileName
    );

    res.sendFile(fullPathFileName);
})



app.get("/api", (req, res, next) => {

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

app.get("/api/comments/:id", (req, res, next) => {

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





app.get("/api/:email", (req, res, next) => {
    console.log(req.params, "rachel biru ");

    const token = req.params.email;
    // const tokenid = req.params._id;

    console.log(token);
    Blog.find({ email: token })

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

app.get("/api/findById/:id", (req, res, next) => {
    console.log(req.params, "id");

    // const token = req.params.email;
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



app.delete("/api/:id", (req, res) => {
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


// app.post('/api/:id', upload.single('someFile'), (req, res) => {

//     console.log(req.params.id , "!!??");

//     Blog.push(req.body)
//     Blog.save()
//     res.status(201).send(Blog)
// })



// app.patch("/api/:id", (req, res) => {
//     const id = req.params.id;
//     console.log(req.params)

//     Blog.findByIdAndUpdate(
//         { _id: id },
//         {
//             $push: { comments: req.body}
//         })
//         .exec()
//         .then(result => {
//             console.log(req.body)
//             console.log(result, "updata succes");
//             res.status(200).json(result)
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })

//         })
// })

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});














































