const express = require("express");
const router = express.Router();
const postsController = require("./posts.controller");
const postsActivityController = require("./posts_activity.controller");
const { tryCatch } = require("../../Utils/tryCatch");

router.post("/create", postsController.createPost);
router.post(
	"/like_or_dislike",
	tryCatch(postsActivityController.add_like_dislike),
);
router.post(
	"/user_list_for_likes/:pc_id",
	tryCatch(postsActivityController.getUsersLikedPostOrComment),
);
router.post("/add_comment", tryCatch(postsActivityController.addComment));
router.get(
	"/all_comments/:upm_id/:sort_order",
	tryCatch(postsActivityController.allComment),
);

module.exports = router;
