const express = require('express');
const UtilController = require('../controllers/util');
const router = express.Router();

router.get("/randomproduct", UtilController.GetRandomProduct);

router.post("/sendquestion", UtilController.SendQuestion);

router.post("/forgetpwd", UtilController.ForgetPwd);

router.post("/ispermitted", UtilController.IsPermitted);

router.post("/resetpwd", UtilController.ResetPwd);

module.exports = router;