import express from "express";
import {connectToDB} from "./connection/connection"
import {authRoutes} from './routes/authRoutes'
import { crudRoutes } from "./routes/crudRoutes";
import cors from 'cors'
import cookieParser from'cookie-parser';

const app = express();
app.use(cors({
    origin:'*',
    credentials:true,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))
app.use(cookieParser())
app.use(express.json())
app.use(authRoutes)
app.use(crudRoutes)


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("connected to server succesfully", [PORT]);
    connectToDB();
}); 
