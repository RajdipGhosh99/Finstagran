"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const posts_controller_1 = __importDefault(require("./posts.controller"));
const posts_activity_controller_1 = __importDefault(require("./posts_activity.controller"));
const tryCatch_1 = require("../../Utils/tryCatch");
router.post("/create", posts_controller_1.default.createPost);
router.get('/fetch', (0, tryCatch_1.tryCatch)(posts_controller_1.default.getPosts));
router.post(`/upload`, posts_controller_1.default.fileUpload);
router.post("/like_or_dislike", (0, tryCatch_1.tryCatch)(posts_activity_controller_1.default.add_like_dislike));
router.post("/user_list_for_likes/:pc_id", (0, tryCatch_1.tryCatch)(posts_activity_controller_1.default.getUsersLikedPostOrComment));
router.post("/add_comment", (0, tryCatch_1.tryCatch)(posts_activity_controller_1.default.addComment));
router.get("/all_comments/:upm_id/:sort_order", (0, tryCatch_1.tryCatch)(posts_activity_controller_1.default.allComment));
exports.default = router;
