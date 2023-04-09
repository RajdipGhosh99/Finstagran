const mongoose = require('mongoose')

const userpostSchema = new mongoose.Schema({
    user_id: {
        trim: true,
        required: true,
        type: new mongoose.Types.ObjectId,
    },
    title: {
        trim: true,
        required: true,
        type: String
    },
    contents: [],
    tags: [],
    time_stamp: {
        required: true,
        type: Date,
        default: new Date()
    },
    is_deleted: {
        type: Boolean,
        default: false
    }

}, { collection: 'userposts_master' })

const PostsModel = mongoose.model('posts', userpostSchema)
module.exports = PostsModel