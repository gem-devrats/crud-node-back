import express from 'express'
import { getContact, createContact, deleteContact, updateContact, sendMail,sheet } from '../controller/crudController';
import { verifyToken } from '../jwt/jwthandler';

export const crudRoutes = express.Router();

crudRoutes.get('/dashboard',verifyToken,getContact)
crudRoutes.post('/dashboard',verifyToken,createContact)
crudRoutes.put('/dashboard/:id',verifyToken,updateContact)
crudRoutes.delete('/dashboard/:id',verifyToken,deleteContact)
crudRoutes.post('/sendMail',verifyToken,sendMail)
crudRoutes.get('/sheet',verifyToken,sheet)