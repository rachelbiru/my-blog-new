var express = require('express');
const users = express();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');


const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'



users.post('/register', (req, res) => {


    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.status(200).json({ status: user.email + "register"  })
                        })
                        .catch(err => {
                            res.status(500).send('error:' + err)
                        })
                })
            } else {
                res.status(404).json({ error: 'User already exist' })
            }
        })
        .catch(err => {
            res.status(500).send('error:' + err)
        })
})


users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        first_name: user.firs_name,
                        last_name: user.last_name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        // expiresIn: 1440
                    })
                    res.status(200).send(user)
                    console.log(user);
                    
                } else {
                   
                    res.status(404).json({ error: "User does not exist" }); 
                    //  res.sendStatus(404);
                }
            } else {
                res.status(404).json({ error: "User does not exist" }); 
 
            }

        })
        .catch(err => {
            res.status(500).send('error:' + err)
        })
})

module.exports = users
