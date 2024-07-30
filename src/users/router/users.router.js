import express from "express";
import { prisma } from "../../../prisma/prismaFilter.js";
import { UsersRepository } from "../users.repository.js";
import { UsersService } from "../users.service.js";
import { UsersController } from "../users.controller.js";
import { authMiddleware } from "../../middlewares/auth.middlewares.js";

const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);


// 유저 전체 조회
router.get('/', authMiddleware, usersController.findAllUser);

// 유저 상세 조회
router.get('/:paramId', authMiddleware, usersController.findUserOne);

export default router;