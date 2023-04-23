"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t6johnu.mongodb.net/${process.env.DB_NAME}`;
let config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose_1.default.connect(dbUrl, config).then(() => {
    console.log("DB connection is successfull.");
}).catch((error) => {
    console.log("Database connection failed, Error: " + error.message);
});
exports.default = mongoose_1.default;
