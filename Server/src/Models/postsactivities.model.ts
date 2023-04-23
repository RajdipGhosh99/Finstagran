import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const postActivitiesSchema = new mongoose.Schema(
	{
		upm_or_cm_id: {
			trim: true,
			required: true,
			type: ObjectId,
		},
		likes: {
			trim: true,
			required: true,
			type: Number,
		},
		comments: {
			trim: true,
			// required: true,
			type: Number,
		},
		shares: {
			trim: true,
			// required: true,
			type: Number,
		},
	},
	{ collection: "postactivities_master" },
);

const PostActivitiesModel = mongoose.model("activities", postActivitiesSchema);
export default PostActivitiesModel;
