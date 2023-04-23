"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        trim: true,
        required: true,
        type: String,
        unique: [true, 'Email already exists!'],
    },
    mobile: {
        trim: true,
        required: true,
        type: String
    },
    fullname: {
        trim: true,
        required: true,
        type: String
    },
    username: {
        trim: true,
        unique: [true, 'Username already exists!'],
        required: true,
        type: String
    },
    password: {
        trim: true,
        required: true,
        minlength: [5, "Password size must be atleast of 5 character."],
        type: String
    },
    token: {
        type: String
    }
}, { collection: 'user_masters' });
const UserModel = mongoose_1.default.model('user', userSchema);
exports.default = UserModel;
