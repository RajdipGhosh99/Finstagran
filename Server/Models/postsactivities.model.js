const mongoose = require('mongoose')

const postActivitiesSchema = new mongoose.Schema({
    upm_or_cm_id: {
        trim: true,
        required: true,
        type: String,
    },
    likes: {
        trim: true,
        required: true,
        type: Number
    },
    comments: {
        trim: true,
        // required: true,
        type: Number
    },
    shares: {
        trim: true,
        // required: true,
        type: Number
    },


}, { collection: 'postactivities_master' })

const PostActivitiesModel = mongoose.model('activities', postActivitiesSchema)
module.exports = PostActivitiesModel