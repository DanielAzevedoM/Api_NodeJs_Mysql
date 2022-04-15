import { Router } from "express";
import { PersonController } from "../controllers/person/person.controller";

const personRoutes = Router();
const personController = new PersonController()

personRoutes.post('/user/:userId/person', personController.create)
personRoutes.get('/user/:userId/person', personController.findOne)
personRoutes.put('/user/:userId/person', personController.update)
personRoutes.delete('/user/:userId/person', personController.remove)


export { personRoutes }



