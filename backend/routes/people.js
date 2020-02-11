const express = require('express');
const peopleController = require('../controllers/people');
const checkAuth = require('../middlewares/check-auth');
const checkAdmin = require('../middlewares/check-admin');
const router = express.Router();

router.get("", peopleController.getPeople);

router.get("/:id", peopleController.getTargetPeople);

router.post("", checkAdmin, peopleController.AddPeople);

router.put("/:id", checkAdmin, peopleController.UpdatePeople);

router.delete("/:id", checkAdmin, peopleController.DeletePeople);

module.exports = router;