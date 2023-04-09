const mongoose = require('mongoose')
const usermodel = require('../../Models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function verifyUser(req, res) {
    try {

        const { email, password } = req.body
        if (!email || !password) {
            res.status(422).json({
                message: "Invalid payload",
                status: 'error',
                data: null
            })
        } else {
            let user = await usermodel.aggregate([
                {
                    $match: {
                        email: email,
                        // password: password
                    }
                }
            ])
            console.log(user);
            if (user.length > 0) {

                let match = await bcrypt.compare(password, user[0].password)

                if (match) {
                    res.status(200).json({
                        message: "User details retrived",
                        status: 'success',
                        data: user
                    })
                } else {
                    res.status(200).json({
                        message: "No Data",
                        status: 'success',
                        data: []
                    })
                }

            } else {
                res.status(200).json({
                    message: "No Data",
                    status: 'success',
                    data: []
                })
            }
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


async function createUser(req, res) {
    try {
        if (!req.body.email || !req.body.mobile || !req.body.fullname || !req.body.username || !req.body.password) {
            res.status(422).json({
                message: "Invalid payload",
                status: 'error',
                data: null
            })
        } else {
            let user = await usermodel.aggregate([
                {
                    $match: {
                        email: req.body.email,
                    }
                }
            ])

            if (user.length > 0) {
                res.status(400).json({
                    message: "Email already exists! Try logging in.",
                    status: 'error',
                    data: user[0].token,
                    redirect_login: true
                })
            } else {
                let token = jwt.sign(req.body, process.env.JWT_PRIVATE)
                await usermodel.create({ ...req.body, password: bcrypt.hashSync(req.body.password, 12), 'token': token })

                res.status(200).json({
                    message: "User created",
                    status: 'success',
                    data: [{ 'token': token }]
                })
            }
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
    verifyUser,
    createUser
}
