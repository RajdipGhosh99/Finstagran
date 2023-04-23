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
const user_model_1 = __importDefault(require("../../Models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function verifyUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(422).json({
                    message: "Invalid payload",
                    status: "error",
                    data: null,
                });
            }
            else {
                let user = yield user_model_1.default.aggregate([
                    {
                        $match: {
                            email: email,
                            // password: password
                        },
                    },
                ]);
                console.log(user);
                if (user.length > 0) {
                    let match = yield bcrypt_1.default.compare(password, user[0].password);
                    if (match) {
                        user.url = '';
                        res.status(200).json({
                            message: "User details retrived",
                            status: "success",
                            data: user,
                        });
                    }
                    else {
                        res.status(200).json({
                            message: "No Data",
                            status: "success",
                            data: [],
                        });
                    }
                }
                else {
                    res.status(200).json({
                        message: "No Data",
                        status: "success",
                        data: [],
                    });
                }
            }
        }
        catch (error) {
            res.status(500).json({
                message: "Server error",
                status: "error",
                error: error,
                data: null,
            });
        }
    });
}
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.email ||
                !req.body.mobile ||
                !req.body.fullname ||
                !req.body.username ||
                !req.body.password) {
                res.status(422).json({
                    message: "Invalid payload",
                    status: "error",
                    data: null,
                });
            }
            else {
                let user = yield user_model_1.default.aggregate([
                    {
                        $match: {
                            email: req.body.email,
                        },
                    },
                ]);
                if (user.length > 0) {
                    res.status(400).json({
                        message: "Email already exists! Try logging in.",
                        status: "error",
                        data: user[0].token,
                        redirect_login: true,
                    });
                }
                else {
                    let token = jsonwebtoken_1.default.sign(req.body, process.env.JWT_PRIVATE);
                    yield user_model_1.default.create(Object.assign(Object.assign({}, req.body), { password: bcrypt_1.default.hashSync(req.body.password, 12), token: token }));
                    res.status(200).json({
                        message: "User created",
                        status: "success",
                        data: [{ token: token }],
                    });
                }
            }
        }
        catch (error) {
            res.status(500).json({
                message: "Server error",
                status: "error",
                error: error,
                data: null,
            });
        }
    });
}
function testing(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.customResponse(300, "success", "Testing new custom resp", [{}]);
        // res.status(200).json({
        // 	message: "User created",
        // 	status: "success",
        // 	data: [{ token: token }],
        // });
    });
}
exports.default = {
    verifyUser,
    createUser,
    testing,
};
