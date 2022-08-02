import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { User } from '../model/userSchema';


export const createToken = (id:any)=>{
    return jwt.sign({id},'crud app',{
        expiresIn:60*60
    })
}


export const verifyToken = (req:Request, res:Response,next:any)=>{
    const token = req.headers['token'] as string
    if (token) {
        console.log(token)
        jwt.verify(token , 'crud app', (err:any, decodedToken:any) => {
          if (err) {
            console.log(err.message);
            res.status(402).send("invalid token");
          } else {
            console.log(decodedToken);
            next();
          }
        });
      } else {
        res.status(402).send("invalid token");
      }
}