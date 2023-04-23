"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Schema.Types.ObjectId;
const postActivitiesSchema = new mongoose_1.default.Schema({
    upm_or_cm_id: {
        trim: true,
        required: true,
        type: ObjectId,
    },
    likes: {
        trim: true,
        required: true,
        type: Number,
    },
    comments: {
        trim: true,
        // required: true,
        type: Number,
    },
    shares: {
        trim: true,
        // required: true,
        type: Number,
    },
}, { collection: "postactivities_master" });
const PostActivitiesModel = mongoose_1.default.model("activities", postActivitiesSchema);
exports.default = PostActivitiesModel;
