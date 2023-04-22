const postModel = require('../../Models/userposts.model')
const activityModel = require('../../Models/postsactivities.model')
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


async function createPost(req, res) {
    try {
        if (!req.body.user_id || !req.body.title) {
            res.status(422).json({
                message: "Invalid payload",
                status: 'error',
                data: null
            })
        } else {
            req.body.user_id = new ObjectId(req.body.user_id)
            let user = await postModel.create(req.body)
            console.log(user);

            if (user) {
                await activityModel.create({
                    upm_or_cm_id: user._id,
                    likes: 0,
                    comments: 0,
                    shares: 0
                })

                res.status(400).json({
                    message: "Post created successfully",
                    status: 'success',
                    data: [user._id],
                })
            } else {
                throw Error("post not created")
            }
        }


    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            status: 'error',
            error: error.message,
            data: null
        })
    }
}


const getPosts = async (req, res) => {
    if (!req.query.user_id) {
        return res.customResponse(422, 'error')
    }

    let data = await postModel.aggregate([
        {
            '$match': {
                'user_id': new ObjectId(req.query.user_id),
                'is_deleted': false
            }
        }, {
            '$lookup': {
                'from': 'likes_masters',
                'localField': '_id',
                'foreignField': 'upm_or_cm_id',
                'as': 'post_likes',
                'pipeline': [
                    {
                        '$match': {
                            'is_deleted': {
                                '$ne': true
                            }
                        }
                    }
                ]
            }
        }, {
            '$lookup': {
                'from': 'comments_masters',
                'localField': '_id',
                'foreignField': 'upm_id',
                'as': 'post_comments',
                'pipeline': [
                    {
                        '$match': {
                            'is_deleted': {
                                '$ne': true
                            }
                        }
                    }
                ]
            }
        }
    ])

    res.customResponse(200, 'success', '', data)

}

module.exports = {
    createPost,
    getPosts
}