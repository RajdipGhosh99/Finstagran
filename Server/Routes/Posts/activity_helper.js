const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const activityModel = require("../../Models/postsactivities.model");
const likesModel = require("../../Models/likes.model");

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

module.exports = {
	updateActivityFieldValueByPostId,
	findLikeUsingUserAndPost,
	likeFindByIdAndUpdate,
};
