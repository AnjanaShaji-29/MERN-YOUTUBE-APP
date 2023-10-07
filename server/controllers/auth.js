import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {

    try{
        const  salt = bcrypt.genSaltSync(10); 
        const  hash = bcrypt.hashSync(req.body.password, salt); // Hashing the password using salt 
        const newUser = new User({...req.body, password: hash }); // Creating new User 
 
        await newUser.save(); // Saving new user to DB
        res.status(200).send("User has been created"); // user created success message

    } catch(err){
       next(err);
    }
}