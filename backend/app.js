const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const People = require('./models/people');

mongoose.connect("mongodb+srv://johnny:Aa00850221@cluster0-yzadz.mongodb.net/OMO?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('db connected');
    })
    .catch((error) => {
        console.log('connection failed');
    })

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
app.use((req, res, next) => {
    //which domain is allowed to fetch the data.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    //which http verbs are allow to send requests.
    //"Options" is a http verb that will be sent by the browser before POST, so we need to allow it too.
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
})

app.get('/people', (req, res) => {
    People.find()
        .then(
            data => {
                res.status(200).json({
                    data: data
                });
            }
        )
});

app.get('/people/:id', (req, res) => {
    People.findById(req.params.id)
        .then((data) => {
            res.status(200).json({
                data: data
            })
        }
        )
});

app.post('/people', (req, res) => {
    const newPerson = new People({
        name: req.body.name,
        age: req.body.age,
        image: req.body.image,
        position: req.body.position,
        text: req.body.text
    });
    newPerson.save()
        .then((result) => {
            res.status(200).json({
                message: 'successfully create a user'
            });
        });
})

app.put('/people/:id', (req, res) => {
    const updatePerson = new People({
        _id: req.body.id,
        name: req.body.name,
        position: req.body.position,
        age: req.body.age,
        text: req.body.description,
        image: req.body.image
    })
    People.updateOne({ _id: req.body.id }, updatePerson)
        .then((result) => {
            if (result.n > 0) {
                res.status(200).json({
                    message: "successfully updated"
                });
            } else {
                res.status(401).json({
                    message: "not authorized"
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "could not update the person"
            });
        });
});

app.delete('/people/:id', (req, res) => {
    People.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.n > 0) {
                res.status(200).json({
                    message: 'successfully deleted'
                });
            } else {
                res.status(401).json({
                    message: 'not authorized'
                });
            }
        })
        .catch((error) => {
            res.status(501).json({
                message: 'fetching failed'
            });
        });
});

module.exports = app;