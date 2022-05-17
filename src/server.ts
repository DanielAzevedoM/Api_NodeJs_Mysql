import 'reflect-metadata';  
import express from 'express';
import { createConnection } from 'typeorm';
import { adressRoutes } from './routes/adress.routes';
import { personRoutes } from './routes/person.routes';
import { userRoutes } from './routes/user.routes';
import { authRoutes } from './routes/auth.routes';


const app = express();

app.use(express.json());
app.use(authRoutes, userRoutes, personRoutes, adressRoutes)

createConnection();

app.listen(3000, () => {
    console.log("Server On")
})


