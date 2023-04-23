"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = __importDefault(require("./user.controller"));
const tryCatch_1 = require("./../../Utils/tryCatch");
router.post("/login", user_controller_1.default.verifyUser);
router.post("/signup", user_controller_1.default.createUser);
router.get("/test", (0, tryCatch_1.tryCatch)(user_controller_1.default.testing));
exports.default = router;
