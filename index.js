//Importing packages
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import userRoute from "./routes/user-routes";
import blogRoute from "./routes/blog-roues";

import path from 'path';

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(cors());

if(process.env.NODE_ENV === 'production') {  
      app.use(express.static('client/build'));  
    }

app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);



// app.use((req, res)=>{
//       res.status(404).send("<h3>404 Page not found</h3>");
// });

mongoose.connect(process.env.MONGO_CONNECTION_URL)
.then(()=>app.listen(PORT))
.then(()=>console.log("Connected to database and listining the PORT number. " + PORT))
.catch((err)=> console.error(err));