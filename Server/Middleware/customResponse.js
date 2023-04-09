function customResponseMiddleware(req, res, next) {
	res.customResponse = (statusCode, statusText, message, data) => {
		res.status(statusCode).json({
			statusText: statusText,
			message: message,
			data: data,
		});
	};
	next();
}

module.exports = customResponseMiddleware;
// module.exports = (app) => {
// 	app.use(customResponseMiddleware);
// };
