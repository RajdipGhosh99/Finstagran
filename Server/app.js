const express = require("express");
require("dotenv").config();
require("./DBmodule/dbCon");
const app = express();
const cors = require("cors");
const userController = require("./Routes/User/index");
const postsController = require("./Routes/Posts/index");

const errorHandlerMiddleware = require("./Middleware/errorHandler");
const customResponseMiddleware = require("./Middleware/customResponse");

app.use(express.json());
app.use(cors());
app.use(customResponseMiddleware);
app.get("/", (req, res) => {
	res.send("Hello Express!");
});

app.use("/user", userController);
app.use("/post", postsController);

app.use(errorHandlerMiddleware);
// errorHandler(app);

app.listen(process.env.PORT, () =>
	console.log(`app is running on port ${process.env.PORT} 🔥`),
);
