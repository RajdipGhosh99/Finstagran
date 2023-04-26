import postModel from '../../Models/userposts.model';
import activityModel from '../../Models/postsactivities.model';
import mongoose from "mongoose";
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


    } catch (error: any) {
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
                    }, {
                        '$project': {
                            '_id': 0,
                            'upm_or_cm_id': 0,
                            'is_deleted': 0,
                            '__v': 0
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
                    }, {
                        '$project': {
                            '_id': 0,
                            'upm_or_cm_id': 0,
                            'is_deleted': 0,
                            '__v': 0
                        }
                    }
                ]
            }
        }, {
            '$lookup': {
                'from': 'user_masters',
                'localField': 'user_id',
                'foreignField': '_id',
                'as': 'post_by',
                'pipeline': [
                    {
                        '$project': {
                            '_id': 0,
                            'username': 0,
                            'password': 0,
                            'token': 0,
                            'mobile': 0,
                            'email': 0,
                            '__v': 0
                        }
                    }
                ]
            }
        }, {
            '$sort': {
                '_id': -1
            }
        }, {
            '$project': {
                'title': 1,
                'contents': 1,
                'tags': 1,
                'time_stamp': 1,
                'post_likes': 1,
                'post_comments': 1,
                'user_id': 1,
                'user_name': {
                    '$arrayElemAt': [
                        '$post_by.fullname', 0
                    ]
                }
            }
        }
    ])

    res.customResponse(200, 'success', '', data)

}


const fileUpload = async (req: any, res) => {

    const fileArr = req?.files?.fileArr;
    if (!fileArr) {
        return res.customResponse(422, "error")
    }

    if (fileArr?.length > 1) {
        console.log("miltiple file");

    } else {
        console.log("single file");
        const file = req.files.fileArr;
        const filePath = '../../../../Uploads' + file.name;
        const fileSize = file.size;

        file.mv(filePath, (err) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.send('File uploaded successfully');
        });

        let uploadedSize = 0;

        // listen for data events to track upload progress
        req.on('data', (chunk) => {
            uploadedSize += chunk.length;
            const progress = Math.round((uploadedSize / fileSize) * 100);
            console.log('Upload progress: ' + progress + '%');
        });
    }



}

export default {
    createPost,
    getPosts,
    fileUpload
}