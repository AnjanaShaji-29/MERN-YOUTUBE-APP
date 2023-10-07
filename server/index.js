import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGO) 
    .then(() => {
        console.log("Connected to DB"); // DB Connection success message
    })
    . catch((err) => {
        throw err; // Error
    });
};

app.listen(8800, () => {
    connect(); // Calling the mongodb connection method
    console.log("Connected to Server!"); // Connected Message
});