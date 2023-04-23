import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

import activityModel from "../../Models/postsactivities.model";
import likesModel from "../../Models/likes.model";

async function findLikeUsingUserAndPost(userId, pcId) {
	return likesModel.findOne({
		user_id: new ObjectId(userId),
		upm_or_cm_id: new ObjectId(pcId),
	});
}

async function updateActivityFieldValueByPostId(id, field, type = "inc") {
	let amount = 1;

	if (type === "dec") {
		amount = -1;
	}

	const result = await activityModel.updateOne(
		{
			upm_or_cm_id: new ObjectId(id),
		},
		{
			$inc: { [field]: amount },
		},
	);
	// console.log("updateActivityFieldValueByPostId", result);
}

async function likeFindByIdAndUpdate(filter, update) {
	return likesModel.findOneAndUpdate(filter, update, {
		new: true,
	});
}
export default {
	updateActivityFieldValueByPostId,
	findLikeUsingUserAndPost,
	likeFindByIdAndUpdate,
};
