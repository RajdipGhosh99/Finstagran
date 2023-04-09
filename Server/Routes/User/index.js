const express = require("express");
const router = express.Router();
const _router = require("./user.controller");
const { tryCatch } = require("./../../Utils/tryCatch");

router.post("/login", _router.verifyUser);
router.post("/signup", _router.createUser);

router.get("/test", tryCatch(_router.testing));
module.exports = router;
