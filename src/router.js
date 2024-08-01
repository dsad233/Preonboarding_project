import express from "express";
import AuthRouter from "../src/auth/router/auth.router.js";
import UsersRouter from "../src/users/router/users.router.js";

const router = express.Router();


router.use('/auth', AuthRouter);
router.use('/users', UsersRouter);


export default router;