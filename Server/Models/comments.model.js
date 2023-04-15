const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentsSchema = new mongoose.Schema({
	user_id: {
		required: true,
		type: ObjectId,
	},
	upm_id: {
		// user_post_masters => _id
		required: true,
		type: ObjectId,
	},
	parent_id: {
		required: true,
		type: String,
		default: "0",
	},
	comment: {
		required: true,
		type: String,
		default: "",
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
