import express from "express";
const router = express.Router();
import postsController from "./posts.controller";
import postsActivityController from "./posts_activity.controller";
import { tryCatch } from "../../Utils/tryCatch";

router.post("/create", postsController.createPost);
router.get('/fetch', tryCatch(postsController.getPosts))
router.post(`/upload`, tryCatch(postsController.fileUpload))
router.get(`/file-stream/:name`, tryCatch(postsController.getFileStream))

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

export default router;
