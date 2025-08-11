// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});

 
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
// const corsOption={
//     origin:'http://localhost:3000',
//     credentials:true
// };

const corsOption = {
    origin: [
        "http://localhost:3000", // agar kabhi port 3000 se run kare
        "http://localhost:3001", // tumhara current frontend dev port
        "https://chat-app-1-0jlj.onrender.com" // deploy hone par frontend ka actual URL
    ],
    credentials: true
};
app.use(cors(corsOption));



// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
 

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at prot ${PORT}`);
});


