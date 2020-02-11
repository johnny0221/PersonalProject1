const express = require('express');
const CommentController = require('../controllers/comment');
const checkAuth = require('../middlewares/check-auth');
const checkCommentOwner = require("../middlewares/check-comment-owner");
const router = express.Router();

router.post("/add", checkAuth, CommentController.AddComment);

router.delete("/delete/:id", checkCommentOwner, CommentController.DeleteComment);

module.exports = router;