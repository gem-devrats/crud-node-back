import { User, userSchema } from "../model/userSchema";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { sendMails } from "../email/emailController";

var id: string;
const readToken = (token: string) => {
    jwt.verify(token, 'crud app', async (error: any, decodedToken: any) => {
        if (error) {
            console.log(error)
        } else {
            id = decodedToken.id
        }
    });
}

export const getContact = async (req: Request, res: Response) => {
    try {
        const token: string = req.headers.token as string
        readToken(token)
        const user = await User.findById(id);
        res.status(200).send(user?.contact)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

export const createContact = async (req: Request, res: Response) => {
    try {
        const { name, email, mobile } = req.body
        const token: string = req.headers.token as string
        readToken(token)
        var conatct = { 'name': name, 'email': email, 'mobile': mobile }
        const user = await User.findByIdAndUpdate(id, { $push: { contact: conatct } });
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
}


export const updateContact = async (req: Request, res: Response) => {
    try {
        const { name, email, mobile } = req.body
        const token: string = req.headers.token as string
        readToken(token)
        const user = await User.updateOne({'contact._id':req.params.id},{$set:{
            'contact.$.name':name,
            'contact.$.email':email,
            'contact.$.mobile':mobile
        }})
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


export const deleteContact = async (req: Request, res: Response) => {
    try {
        const token: string = req.headers.token as string
        readToken(token)
        console.log(req.params.id)
        const user = await User.updateOne({ _id: id }, { $pull: { contact:{ _id: req.params.id } } })
        res.status(200).send(user);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


export const sendMail =async (req: Request, res: Response) => {
    try{
        const token: string = req.headers.token as string
        readToken(token)
        const {to, subject, message} = req.body
        sendMails(to,subject,message)
        res.send('cchfc')
    }
    catch(error){
        console.log(error)
        res.status(400).send(error)
    }
} 