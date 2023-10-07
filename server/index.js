import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import cookieParser from "cookie-parser";

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

app.use(cookieParser());
app.use(express.json()); // Enabling json 

app.use("/api/auth/", authRoutes); // Auth Routes
app.use("/api/users/", userRoutes);  // User Routes
app.use("/api/videos/", videoRoutes); // Video Routes 
app.use("/api/comments/", commentRoutes); // Comment Routes


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Somwthing went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})


app.listen(8800, () => {
    connect(); // Calling the mongodb connection method
    console.log("Connected to Server!"); // Connected Message
});