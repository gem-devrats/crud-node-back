import { User } from "../model/userSchema";
import { hashPassword,login } from "../model/modelMethod";
import { Request, Response } from "express";
import { createToken } from "../jwt/jwthandler";

export const signup = async (req:Request, res :Response) => {
    try{
        req.body.password = await hashPassword(req.body.password);
        const user = await User.create(req.body);
        res.send(user);
    }catch(error:any){
        console.log(error.code)
        if(error.code==11000){
            res.status(409).send(error)
        } else{
            res.status(400).send(error)
        }
    }
}

export const signin =async (req:Request, res:Response) => {
    try{
        var {email,password} = req.body;
        const user = await login(email,password);
        const jwt = createToken(user._id);
        // res.cookie('jwt',jwt,{
        //     httpOnly:true,
        //     maxAge:1000*60*60
        // })
        res.status(200).send({user,jwt});
    } catch(error:any){
        console.log(error.message)
        if(error.message=='Invalid Email or Password'){
            res.status(401).send(error)
        }
        res.status(400).send(error)
    }
}

export const logout =async (req:Request,res:Response) => {
    // res.cookie('jwt','',{
    //     httpOnly:true,
    //     maxAge:1
    // })
    res.status(200).send('success')
}