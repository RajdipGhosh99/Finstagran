"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Schema.Types.ObjectId;
const userpostSchema = new mongoose_1.default.Schema({
    user_id: {
        trim: true,
        required: true,
        type: ObjectId,
    },
    title: {
        trim: true,
        required: true,
        type: String,
    },
    contents: [],
    tags: [],
    time_stamp: {
        required: true,
        type: Date,
        default: new Date(),
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
}, { collection: "userposts_master" });
const PostsModel = mongoose_1.default.model("posts", userpostSchema);
exports.default = PostsModel;
