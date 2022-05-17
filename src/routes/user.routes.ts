import { Router } from "express";
import { UserController } from "../controllers/user/user.controller";
import AuthMiddleware from "../middlewares/auth/authMiddleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/user', AuthMiddleware, userController.findAll)
userRoutes.get('/user/data', AuthMiddleware, userController.findOne)
userRoutes.put('/user/update', AuthMiddleware, userController.update)
userRoutes.delete('/user/delete', AuthMiddleware, userController.remove)


export { userRoutes }



