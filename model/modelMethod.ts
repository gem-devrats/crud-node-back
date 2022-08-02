import bcrypt from 'bcrypt';
import { User } from './userSchema';

export const hashPassword = async (password: string) => {
    const key = await bcrypt.genSalt();
    var hashedPassword = await bcrypt.hash(password, key);
    return hashedPassword;
}

export const login = async (email: string, password: string) => {
    const user = await User.findOne({email:email})
    if(user){
        const isSuccess = await bcrypt.compare(password,user.password);
        if(isSuccess){
            return user
        } else{
            throw Error("Invalid Email or Password")
        }
    } else{
        throw Error("Invalid Email or Password")
    }
}