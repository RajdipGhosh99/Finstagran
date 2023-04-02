const mongoose = require('mongoose')
const usermodel = require('../../Models/user.model')

async function verifyUser(req, res) {
    try{

        const { email, password } = req.body
        if (!email || !password) {
            res.status(422).json({
                message: "Invalid payload",
                status: 'error',
                data: null
            })
        }

        let user = await usermodel.aggregate([
            {
                $match: {
                    email: email,
                    password: password
                }
            }
        ])
        console.log(user);
        if (user.length>0) {
            res.status(200).json({
                message: "User details retrived",
                status: 'success',
                data: user
            })
        }else{
            res.status(200).json({
                message: "No Data",
                status: 'success',
                data: []
            }) 
        }
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            status: 'error',
            error: error,
            data: null
        })
    }

}



module.exports = {
    verifyUser
}
