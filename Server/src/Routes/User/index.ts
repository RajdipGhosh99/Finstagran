import express from "express";
const router = express.Router();
import _router from "./user.controller";
import { tryCatch } from "./../../Utils/tryCatch";

router.post("/login", _router.verifyUser);
router.post("/signup", _router.createUser);

router.get("/test", tryCatch(_router.testing));
export default router;
