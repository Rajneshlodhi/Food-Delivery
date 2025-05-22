import mongoose from "mongoose";    

// export const connectDB =async()=>{
//     await mongoose.connect('mongodb+srv://rajneshlodhi:lodhi1234@cluster0.lmmm7dn.mongodb.net/food-del',).then(()=>console.log("DB connected"));
// }
const connectDB =async()=>{
    try{
        mongoose.connection.on('connected' , ()=>console.log("Database Connected"))
await mongoose.connect(`${process.env.MONGODB_URI}/food-del`)
    }
    catch(error){
         console.log(error.message)
    }
}

export default connectDB;