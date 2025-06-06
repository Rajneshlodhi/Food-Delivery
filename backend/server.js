import express from "express"
import cors from"cors"
import "dotenv/config"
import foodRouter from "./routes/foodRoute.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


connectDB()

//app config
const app= express()
const port = process.env.port || 4000;


//middleware
app.use(express.json())
app.use(cors())




//api endpoints

app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


app.get("/",(req, resp)=>{
  resp.send("Api working i")
})

app.listen(port,()=>{
    console.log(`sever started on http://localhost:${port}`);
    
})


// // ✅ Correct ES Module export
// export default app;

