const postModel = require('../../Models/userposts.model')
const activityModel = require('../../Models/postsactivities.model')


async function createPost(req, res) {
    try {
        if (!req.body.user_id || !req.body.title) {
            res.status(422).json({
                message: "Invalid payload",
                status: 'error',
                data: null
            })
        } else {
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

module.exports = {
    createPost
}