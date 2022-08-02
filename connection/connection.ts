import mongoose from "mongoose";


const dataBaseURI: string = "mongodb://localhost:27017/CRUD"

export const connectToDB = async () => {
    await mongoose.connect(dataBaseURI)
    .then(()=>{
        console.log("connection to database succesfull");
    })
    .catch((error)=>{
        console.log(error)
    })
}
