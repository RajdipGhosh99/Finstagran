
const helper = (userMessage, statusCode) => {
	if (userMessage) {
		return userMessage
	}

	switch (statusCode) {
		case 422:
			return 'Unprocessable Content'
		case 200:
			return 'Data retrive successfully'
		case 400:
			return 'Bad Request'
		default:
			return "Can't retrive error details"
	}

}

function customResponseMiddleware(req, res, next) {
	res.customResponse = (statusCode, statusText, message = '', data = null) => {
		res.status(statusCode).json({
			status: statusText,
			message: helper(message, statusCode),
			data: data,
		});
	};
	next();
}

module.exports = customResponseMiddleware;
// module.exports = (app) => {
// 	app.use(customResponseMiddleware);
// };
