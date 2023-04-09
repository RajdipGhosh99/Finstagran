const express = require('express')
const router = express.Router()
const postsController = require('./posts.controller')

router.post('/create', postsController.createPost)

module.exports = router