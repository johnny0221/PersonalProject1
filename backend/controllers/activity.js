const Activity = require("../models/activity");

exports.GetActivities = async (req, res) => {
    try {
        const pagesize = +req.query.pagesize;
        const currentpage = +req.query.currentpage;
        const Activities = await Activity.find({});
        const maxlength = Activities.length;
        const FetchedActivities = await Activity.find({}).skip(pagesize * (currentpage - 1)).limit(pagesize).sort({ DateStart: -1 });
        res.status(200).json({
            data: FetchedActivities,
            maxlength: maxlength
        });
    } catch (e) {
        res.status(500).json({
            message: e.error
        })
    }
};

//Activity Create
exports.CreateActivity = (req, res) => {
    const newAcitivty = new Activity({
        name: req.body.name,
        DateStart: req.body.DateStart,
        DateEnd: req.body.DateEnd,
        image: req.body.image,
        description: req.body.description
    });
    newAcitivty.save()
        .then(data => {
            res.status(200).json({
                message: 'successfully created'
            })
        });
};

//get Target Activity
exports.GetTargetActivity = async (req, res) => {
    const TargetActivity = await Activity.findById(req.params.id);
    res.status(200).send(TargetActivity);
};

//update Target Activity
exports.UpdateActivity = async (req, res) => {
    try {
        const UpdateActivity = new Activity({
            _id: req.params.id,
            name: req.body.name,
            DateStart: req.body.DateStart,
            DateEnd: req.body.DateEnd,
            image: req.body.image,
            description: req.body.description
        });
        const result = await Activity.updateOne({ _id: req.params.id }, UpdateActivity);
        if (result.n > 0) {
            res.status(200).json({
                message: "successfully updated"
            });
        } else {
            res.status(403).json({
                message: "not authorized"
            });
        }
    } catch (e) {
        res.status(500).json({
            message: e.error
        })
    }
};

//Delete Target Activity
exports.DeleteActivity = async (req, res) => {
    try {
        const result = await Activity.deleteOne({ _id: req.params.id });
        if (result.n > 0) {
            res.status(200).json({
                message: "successfully updated"
            });
        } else {
            res.status(403).json({
                message: "not authorized"
            });
        }
    } catch (e) {
        res.status(500).json({
            message: e.error
        })
    }
};