import userModel from '../Models/user.model'

const authorizers = async (req, res, next) => {
    const token = req.headers["authorization"]
    if (token) {
        let user = await userModel.findOne({ token: token })
        if (user) {
            next()
        } else {
            res.status(401).json({
                status: 'error',
                message: 'Not Authorize user.'
            })
        }
    } else {
        res.status(401).json({
            status: 'error',
            message: 'Not Authorize user.'
        })
    }

}

export default authorizers