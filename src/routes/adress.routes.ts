import { Router } from "express";
import { AdressController } from "../controllers/adress/adress.controller";
import AuthMiddleware from "../middlewares/auth/authMiddleware";

const adressRoutes = Router();
const adressController = new AdressController()

adressRoutes.post('/person/adress', AuthMiddleware, adressController.create)
adressRoutes.get('/person/adress', AuthMiddleware, adressController.findAll)
adressRoutes.get('/person/adress/:id', AuthMiddleware, adressController.findOne)
adressRoutes.put('/person/adress/:id', AuthMiddleware, adressController.update)
adressRoutes.delete('/person/adress/:id', AuthMiddleware, adressController.remove)


export { adressRoutes }



