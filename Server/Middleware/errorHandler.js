function errorHandler(error, req, res, next) {
	if (res) {
		return res.status(error.statusCode || 500).json({
			message: error.message || "Something went wrong!",
			error: error.name || "Server Error",
		});
	}
	// console.log("errorHandler", error && error.stack ? error.stack : error);
}

module.exports = function (app) {
	app.use(errorHandler);
};
