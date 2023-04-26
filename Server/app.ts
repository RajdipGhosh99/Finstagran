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
import fileUpload from 'express-fileupload';

app.use(express.json());
app.use(cors());
app.use(customResponseMiddleware);
app.use(fileUpload({
	limits: { fileSize: 50 * 1024 * 1024 }, // set a limit of 50 MB for the uploaded file size
	abortOnLimit: true, // abort the request if the limit is exceeded
	responseOnLimit: 'File size limit has been reached', // send an error message if the limit is exceeded
	createParentPath: true // create the destination folder if it doesn't exist
}))
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
