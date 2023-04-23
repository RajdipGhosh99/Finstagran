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
const postsactivities_model_1 = __importDefault(require("../../Models/postsactivities.model"));
const likes_model_1 = __importDefault(require("../../Models/likes.model"));
function findLikeUsingUserAndPost(userId, pcId) {
    return __awaiter(this, void 0, void 0, function* () {
        return likes_model_1.default.findOne({
            user_id: new ObjectId(userId),
            upm_or_cm_id: new ObjectId(pcId),
        });
    });
}
function updateActivityFieldValueByPostId(id, field, type = "inc") {
    return __awaiter(this, void 0, void 0, function* () {
        let amount = 1;
        if (type === "dec") {
            amount = -1;
        }
        const result = yield postsactivities_model_1.default.updateOne({
            upm_or_cm_id: new ObjectId(id),
        }, {
            $inc: { [field]: amount },
        });
        // console.log("updateActivityFieldValueByPostId", result);
    });
}
function likeFindByIdAndUpdate(filter, update) {
    return __awaiter(this, void 0, void 0, function* () {
        return likes_model_1.default.findOneAndUpdate(filter, update, {
            new: true,
        });
    });
}
exports.default = {
    updateActivityFieldValueByPostId,
    findLikeUsingUserAndPost,
    likeFindByIdAndUpdate,
};
