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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
                    }, {
                        '$project': {
                            '_id': 0,
                            'upm_or_cm_id': 0,
                            'is_deleted': 0,
                            '__v': 0
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
                    }, {
                        '$project': {
                            '_id': 0,
                            'upm_or_cm_id': 0,
                            'is_deleted': 0,
                            '__v': 0
                        }
                    }
                ]
            }
        }, {
            '$lookup': {
                'from': 'user_masters',
                'localField': 'user_id',
                'foreignField': '_id',
                'as': 'post_by',
                'pipeline': [
                    {
                        '$project': {
                            '_id': 0,
                            'username': 0,
                            'password': 0,
                            'token': 0,
                            'mobile': 0,
                            'email': 0,
                            '__v': 0
                        }
                    }
                ]
            }
        }, {
            '$sort': {
                '_id': -1
            }
        }, {
            '$project': {
                'title': 1,
                'contents': 1,
                'tags': 1,
                'time_stamp': 1,
                'post_likes': 1,
                'post_comments': 1,
                'user_id': 1,
                'user_name': {
                    '$arrayElemAt': [
                        '$post_by.fullname', 0
                    ]
                }
            }
        }
    ]);
    res.customResponse(200, 'success', '', data);
});
const fileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req === null || req === void 0 ? void 0 : req.files);
    const videoFile = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.video;
    if (!videoFile) {
        return res.customResponse(422, "error");
    }
    const fileSize = videoFile.size;
    const videoPath = path_1.default.join(__dirname, 'uploaded_video.mp4');
    const videoStream = fs_1.default.createWriteStream(videoPath);
    let uploadedSize = 0;
    videoFile.on('data', (chunk) => {
        uploadedSize += chunk.length;
        const progress = (uploadedSize / fileSize) * 100;
        console.log(`Upload progress: ${progress.toFixed(2)}%`);
        res.write(JSON.stringify({ progress }));
    });
    videoFile.pipe(videoStream);
    videoStream.on('finish', () => {
        console.log('Video uploaded successfully');
        res.send('Video uploaded successfully');
    });
    videoStream.on('error', (err) => {
        console.error(err);
        res.status(500).send('Error uploading video');
    });
});
exports.default = {
    createPost,
    getPosts,
    fileUpload
};
