const express = require("express")
const router = express.Router()
const _router = require('./user.controller')


router.post('/login',_router.verifyUser)

module.exports = router