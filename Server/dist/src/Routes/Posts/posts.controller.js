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
const userposts_model_1 = __importDefault(require("../../Models/userposts.model"));
const postsactivities_model_1 = __importDefault(require("../../Models/postsactivities.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.user_id || !req.body.title) {
                res.status(422).json({
                    message: "Invalid payload",
                    status: 'error',
                    data: null
                });
            }
            else {
                req.body.user_id = new ObjectId(req.body.user_id);
                let user = yield userposts_model_1.default.create(req.body);
                console.log(user);
                if (user) {
                    yield postsactivities_model_1.default.create({
                        upm_or_cm_id: user._id,
                        likes: 0,
                        comments: 0,
                        shares: 0
                    });
                    res.status(400).json({
                        message: "Post created successfully",
                        status: 'success',
                        data: [user._id],
                    });
                }
                else {
                    throw Error("post not created");
                }
            }
        }
        catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                status: 'error',
                error: error.message,
                data: null
            });
        }
    });
}
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.user_id) {
        return res.customResponse(422, 'error');
    }
    let data = yield userposts_model_1.default.aggregate([
        {
            '$match': {
                'user_id': new ObjectId(req.query.user_id),
                'is_deleted': false
            }
        }, {
            '$lookup': {
                'from': 'likes_masters',
                'localField': '_id',
                'foreignField': 'upm_or_cm_id',
                'as': 'post_likes',
                'pipeline': [
                    {
                        '$match': {
                            'is_deleted': {
                                '$ne': true
                            }
                        }
                    }
                ]
            }
        }, {
            '$lookup': {
                'from': 'comments_masters',
                'localField': '_id',
                'foreignField': 'upm_id',
                'as': 'post_comments',
                'pipeline': [
                    {
                        '$match': {
                            'is_deleted': {
                                '$ne': true
                            }
                        }
                    }
                ]
            }
        }
    ]);
    res.customResponse(200, 'success', '', data);
});
exports.default = {
    createPost,
    getPosts
};
