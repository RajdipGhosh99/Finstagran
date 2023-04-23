import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const likesSchema = new mongoose.Schema({
	user_id: {
		required: true,
		type: ObjectId,
	},
	upm_or_cm_id: {
		required: true,
		type: ObjectId,
	},
	type: {
		required: true,
		type: String,
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

const LikesModel = mongoose.model("likes_master", likesSchema);
export default LikesModel;
