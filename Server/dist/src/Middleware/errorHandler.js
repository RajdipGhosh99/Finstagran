"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandlerMiddleware(error, req, res, next) {
    if (res) {
        return res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message || "Something went wrong!",
            error: error.name || "Server Error",
            data: null,
        });
    }
    // console.log("errorHandler", error && error.stack ? error.stack : error);
}
exports.default = errorHandlerMiddleware;
// module.exports = function (app) {
// 	app.use(errorHandler);
// };
