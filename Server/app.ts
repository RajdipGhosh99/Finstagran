import express from "express";
require("dotenv").config();
require("./src/DBmodule/dbCon");
const app = express();
import cors from "cors";
import userController from "./src/Routes/User/index";
import postsController from "./src/Routes/Posts/index";

import errorHandlerMiddleware from "./src/Middleware/errorHandler";
import customResponseMiddleware from "./src/Middleware/customResponse";
import authorizers from "./src/Middleware/authorizers";

app.use(express.json());
app.use(cors());
app.use(customResponseMiddleware);
app.get("/", (req, res) => {
	res.send("Hello Express!");
});

app.use("/user", userController);
app.use("/post", authorizers, postsController);

app.use(errorHandlerMiddleware);
// errorHandler(app);

app.listen(process.env.PORT, () =>
	console.log(`app is running on port ${process.env.PORT} 🔥`),
);
