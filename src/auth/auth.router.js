import express from "express";
import { prisma } from "../../prisma/prismaFilter.js";
import { AuthRepository } from "../auth/auth.repository.js";
import { AuthService } from "../auth/auth.service.js";
import { AuthController } from "../auth/auth.controller.js";
const router = express.Router();

const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

// 회원가입
router.post('/register', authController.register);

// 로그인
router.post('/login', authController.login);


export default router;