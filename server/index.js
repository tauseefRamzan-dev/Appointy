require('dotenv').config();
const express=require("express");
const app=express();
const cors=require("cors")
const { connectToMongoDB, disconnectFromMongoDB }=require("./config/db")
const auth=require("./routes/auth")
const userRoutes=require("./routes/userRoutes")
const adminRoutes=require("./routes/adminRoutes")
const doctorRoutes=require("./routes/doctorRoutes")
const appointmentRoutes=require("./routes/appointmentRoutes")
const {PORT=8000}=process.env;
app.use(express.json());

app.use(cors());

connectToMongoDB();
app.get("/",(req,res)=>{
      const now=new Date();
      res.send(`Current Time ${now.toUTCString()}. Server is running`);
})
app.use("/auth",auth)
app.use("/user",userRoutes)
app.use("/admin",adminRoutes)
app.use("/doctor",doctorRoutes)
app.use("/appointments",appointmentRoutes)
app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`)
})

