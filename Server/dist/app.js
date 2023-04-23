"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
require("./src/DBmodule/dbCon");
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./src/Routes/User/index"));
const index_2 = __importDefault(require("./src/Routes/Posts/index"));
const errorHandler_1 = __importDefault(require("./src/Middleware/errorHandler"));
const customResponse_1 = __importDefault(require("./src/Middleware/customResponse"));
const authorizers_1 = __importDefault(require("./src/Middleware/authorizers"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(customResponse_1.default);
app.get("/", (req, res) => {
    res.send("Hello Express!");
});
app.use("/user", index_1.default);
app.use("/post", authorizers_1.default, index_2.default);
app.use(errorHandler_1.default);
// errorHandler(app);
app.listen(process.env.PORT, () => console.log(`app is running on port ${process.env.PORT} 🔥`));
