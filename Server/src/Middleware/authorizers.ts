import { log } from 'console';
import userModel from '../Models/user.model'
import jwt from "jsonwebtoken";

const authorizers = async (req, res, next) => {
    const token = req.headers["authorization"]
    if (token) {
        let user = await userModel.findOne({ token: token })
        if (user) {
            try {
                jwt.verify(token, process.env.JWT_PRIVATE)
                next()
            } catch (error) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Not Authorize user.'
                })

            }
        } else {
            return res.status(401).json({
                status: 'error',
                message: 'Not Authorize user.'
            })
        }
    } else {
        return res.status(401).json({
            status: 'error',
            message: 'Not Authorize user.'
        })
    }

}

export default authorizers