"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Schema.Types.ObjectId;
const likesSchema = new mongoose_1.default.Schema({
    user_id: {
        required: true,
        type: ObjectId,
    },
    upm_or_cm_id: {
        required: true,
        type: ObjectId,
    },
    type: {
        required: true,
        type: String,
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
const LikesModel = mongoose_1.default.model("likes_master", likesSchema);
exports.default = LikesModel;
