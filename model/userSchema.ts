import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Cannot be empty"],
    },
    email: {
        type: String,
        required: [true, "Email can not be empty"],
        unique: [true, "Email is already registered"],
        lowercase: [true]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, "Please provide valid password"]
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    contact: [{
        name: {
            type: String,
            required: [true, "Name Cannot be empty"],
        },
        email: {
            type: String,
            required: [true, "Email can not be empty"],
            lowercase: [true]
        },
        mobile: {
            type: String,
            required: [true, "Please Provide Mobile Number"]
        }
    }]
}, { timestamps: true })


export const User = mongoose.model('user', userSchema);
