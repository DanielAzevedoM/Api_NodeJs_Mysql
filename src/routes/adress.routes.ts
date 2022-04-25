import { Router } from "express";
import { AdressController } from "../controllers/adress/adress.controller";

const adressRoutes = Router();
const adressController = new AdressController()

adressRoutes.post('/user/person/:personId/adress', adressController.create)
adressRoutes.get('/user/person/:personId/adress', adressController.findAll)
adressRoutes.get('/user/person/:personId/adress/:id', adressController.findOne)
adressRoutes.put('/user/person/:personId/adress/:id', adressController.update)
adressRoutes.delete('/user/person/:personId/adress/:id', adressController.remove)


export { adressRoutes }



