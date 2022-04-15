import { Router } from "express";
import { UserController } from "../controllers/user/user.controller";

const userRoutes = Router();
const userController = new UserController()

userRoutes.post('/user', userController.create)
userRoutes.get('/user', userController.findAll)
userRoutes.get('/user/:id', userController.findOne)
userRoutes.put('/user/:id', userController.update)
userRoutes.delete('/user/:id', userController.remove)


export { userRoutes }



