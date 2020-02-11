const express = require('express');
const ActivtiyController = require('../controllers/activity');
const checkAdmin = require('../middlewares/check-admin');
const router = express.Router();

router.get("", ActivtiyController.GetActivities);

router.post("", checkAdmin, ActivtiyController.CreateActivity);

router.get("/:id", ActivtiyController.GetTargetActivity);

router.put("/:id", checkAdmin, ActivtiyController.UpdateActivity);

router.delete("/:id", checkAdmin, ActivtiyController.DeleteActivity);

module.exports = router;