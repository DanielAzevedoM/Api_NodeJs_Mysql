import { Router } from "express";
import { AdressController } from "../controllers/adress/adress.controller";

const adressRoutes = Router();
const adressController = new AdressController()

adressRoutes.post('/user/:userId/person/:personId/adress', adressController.create)
adressRoutes.get('/user/:userId/person/:personId/adress', adressController.findAll)
adressRoutes.get('/user/:userId/person/:personId/adress/:id', adressController.findOne)
adressRoutes.put('/user/:userId/person/:personId/adress/:id', adressController.update)
adressRoutes.delete('/user/:userId/person/:personId/adress/:id', adressController.remove)


export { adressRoutes }



