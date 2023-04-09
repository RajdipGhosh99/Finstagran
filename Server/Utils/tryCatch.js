exports.tryCatch = (controller) => async (req, res, next) => {
	try {
		await controller(req, res);
	} catch (error) {
		console.log("tryCatch", error);
		return next(error);
	}
};
