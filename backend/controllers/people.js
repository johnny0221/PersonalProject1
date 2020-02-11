const People = require('../models/people');

exports.getPeople = (req, res) => {
    People.find()
        .then(
            data => {
                res.status(200).json({
                    data: data
                });
            }
        )
};

exports.getTargetPeople = (req, res) => {
    People.findById(req.params.id)
        .then((data) => {
            res.status(200).json({
                data: data
            })
        }
        )
};

exports.AddPeople = (req, res) => {
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
};

exports.UpdatePeople = (req, res) => {
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
};

exports.DeletePeople = (req, res) => {
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
};


