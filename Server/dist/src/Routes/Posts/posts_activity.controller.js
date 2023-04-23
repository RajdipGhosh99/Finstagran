"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const likes_model_1 = __importDefault(require("../../Models/likes.model"));
const comments_model_1 = __importDefault(require("../../Models/comments.model"));
const activity_helper = Object.assign({}, require("./activity_helper"));
function add_like_dislike(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.user_id || !req.body.pc_id || !req.body.type) {
            res.customResponse(422, "error", "Invalid payload", null);
        }
        else {
            //Find like by user_id and comment_id or post_id
            let f_like = yield activity_helper.findLikeUsingUserAndPost(req.body.user_id, req.body.pc_id);
            // console.log("f_like", f_like);
            if (f_like) {
                //update
                let is_deleted = !f_like.is_deleted;
                let filter = { _id: f_like._id };
                let update = { time_stamp: new Date(), is_deleted: is_deleted };
                // Update like collection
                yield activity_helper.likeFindByIdAndUpdate(filter, update);
                // Update postacticities collection likes field
                yield activity_helper.updateActivityFieldValueByPostId(req.body.pc_id, "likes", is_deleted ? "dec" : "inc");
            }
            else {
                //create new
                const like_obj = {
                    user_id: req.body.user_id,
                    type: req.body.type,
                    upm_or_cm_id: req.body.pc_id,
                };
                let like = yield likes_model_1.default.create(like_obj);
                // console.log(like);
                // Update postacticities collection likes field
                yield activity_helper.updateActivityFieldValueByPostId(req.body.pc_id, "likes");
            }
            res.customResponse(200, "success", "Post liked/ undo_like successfully", []);
        }
    });
}
function getUsersLikedPostOrComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.params.pc_id) {
            res.customResponse(422, "error", "Invalid payload", null);
        }
        else {
            //Find users who liked a specific comment_id or post_id
            let _filter = {
                upm_or_cm_id: new ObjectId(req.params.pc_id),
                is_deleted: false,
            };
            let users = yield likes_model_1.default.aggregate([
                {
                    $match: _filter,
                },
                {
                    $lookup: {
                        from: "user_masters",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                    },
                },
                {
                    $project: {
                        _id: 0,
                        l_id: "$_id",
                        pc_id: "$upm_or_cm_id",
                        time_stamp: 1,
                        u_id: "$user_id",
                        fullname: "$user.fullname",
                        username: "$user.username",
                    },
                },
            ]);
            res.customResponse(200, "success", "Users fetched successfully", users);
        }
    });
}
function addComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _rb = req.body;
        if (!_rb.upm_id || !_rb.user_id || !_rb.comment) {
            return res.customResponse(422, "error", "Invalid input", []);
        }
        let obj = {
            upm_id: _rb.upm_id,
            user_id: _rb.user_id,
            comment: _rb.comment,
        };
        let insComment = yield comments_model_1.default.create(obj);
        yield activity_helper.updateActivityFieldValueByPostId(_rb.upm_id, "comments");
        res.customResponse(200, "success", "Comment Added Successfully", [
            insComment._id,
        ]);
    });
}
function allComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.params.upm_id) {
            return res.customResponse(422, "error", "Invalid input", []);
        }
        let _filter = {
            upm_id: new ObjectId(req.params.upm_id),
            is_deleted: false,
        };
        let _sort = {
            _id: Number(req.params.sort_order || -1),
        };
        let comments = yield comments_model_1.default.aggregate([
            { $match: _filter },
            { $sort: _sort },
            {
                $lookup: {
                    from: "user_masters",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: {
                    path: "$user",
                },
            },
            {
                $project: {
                    _id: 0,
                    c_id: "$_id",
                    pc_id: "$upm_id",
                    time_stamp: 1,
                    comment: 1,
                    u_id: "$user_id",
                    fullname: "$user.fullname",
                    username: "$user.username",
                },
            },
        ]);
        // console.log(comments);
        res.customResponse(200, "success", "Comment Added Successfully", comments);
    });
}
exports.default = {
    add_like_dislike,
    getUsersLikedPostOrComment,
    addComment,
    allComment,
};
