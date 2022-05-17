import { Router } from "express";
import multer from 'multer';
import { multerConfig } from "../config/multer/multer";
import { PersonController } from "../controllers/person/person.controller";
import AuthMiddleware from "../middlewares/auth/authMiddleware";

const personRoutes = Router();
const personController = new PersonController()

personRoutes.post('/user/person', AuthMiddleware, personController.create)
personRoutes.get('/user/person', AuthMiddleware, personController.findOne)
personRoutes.put('/user/person', AuthMiddleware, personController.update)
personRoutes.delete('/user/person', AuthMiddleware, personController.remove)
personRoutes.patch('/user/person', AuthMiddleware, multer(multerConfig).single('image'), personController.updateSelfie )


export { personRoutes }



