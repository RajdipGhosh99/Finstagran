"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Schema.Types.ObjectId;
const commentsSchema = new mongoose_1.default.Schema({
    user_id: {
        required: true,
        type: ObjectId,
    },
    upm_id: {
        // user_post_masters => _id
        required: true,
        type: ObjectId,
    },
    parent_id: {
        required: true,
        type: String,
        default: "0",
    },
    comment: {
        required: true,
        type: String,
        default: "",
    },
    time_stamp: {
        required: true,
        type: Date,
        default: new Date(),
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
});
const CommentsModel = mongoose_1.default.model("comments_master", commentsSchema);
exports.default = CommentsModel;
