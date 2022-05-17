import { Router } from "express";
import { AuthController } from "../controllers/auth/auth.controller";
import AuthMiddleware from "../middlewares/auth/authMiddleware";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/auth', authController.create)
authRoutes.post('/auth/login', authController.authenticate)
authRoutes.put('/auth/changePassword', AuthMiddleware, authController.changePassword)

export { authRoutes }



