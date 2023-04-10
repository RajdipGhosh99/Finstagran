const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
	user_id: {
		required: true,
		type: String,
	},
	upm_id: {
		// user_post_masters => _id
		required: true,
		type: String,
	},
	parent_id: {
		required: true,
		type: String,
		default: "0",
	},
	time_stamp: {
		required: true,
		type: Date,
		default: new Date(),
	},
	is_deleted: {
		type: Boolean,
		default: false,
	},
});

const CommentsModel = mongoose.model("comments_master", commentsSchema);
module.exports = CommentsModel;
