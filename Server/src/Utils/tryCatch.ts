export const tryCatch = (controller) => async (req, res, next) => {
	try {
		await controller(req, res);
		// return next(res);
	} catch (error) {
		console.log("tryCatch", error);
		return next(error);
	}
};
