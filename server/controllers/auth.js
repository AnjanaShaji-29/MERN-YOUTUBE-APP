import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {

    try{
        const  salt = bcrypt.genSaltSync(10); 
        const  hash = bcrypt.hashSync(req.body.password, salt); // Hashing the password using salt 
        const newUser = new User({...req.body, password: hash }); // Creating new User 
 
        await newUser.save(); // Saving new user to DB
        res.status(200).send("User has been created"); // user created success message

        
    } catch(err){
       next(err); // Error
    }
}


export const signin = async (req, res, next) => {

    try{
        const user =  await User.findOne({name: req.body.name}) // Finding user by name from DB
        if(!user)
        return next(createError(404, "User not found!")); // User not found error message

        const isCorrect = await bcrypt.compare(req.body.password, user.password); // Comparing stored & readed password 
        if(!isCorrect)
        return next(createError(404, "Password doesn't match!")); // Password not match error message

        const token = jwt.sign({id: user._id}, process.env.JWT) // Creating token
        const { password, ...others} = user._doc; // Prevent sending password & other info 
        
        res.cookie("access_token", token, { 
            httpOnly: true // Make more secure by blocking third party apps
        }).status(200).json(others); // Sending user details except password


    } catch(err){
       next(err); // Error
    }
};


export const googleAuth = async (req, res, next) => {

    try{
        const user = await User.findOne({ email: req.body.email}); // Finding the user by email id
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT) // Creating token

            res.cookie("access_token", token, { 
                httpOnly: true // Make more secure by blocking third party apps
            }).status(200).json(user._doc); // Sending user details 
    
        } else{ // Creating new user
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })

            const savedUser = await newUser.save(); // Saving the new user into DB

            const token = jwt.sign({id: savedUser._id}, process.env.JWT) // Creating token

            res.cookie("access_token", token, { 
                httpOnly: true // Make more secure by blocking third party apps
            }).status(200).json(savedUser._doc); // Sending user details 
    
        }
    } catch(err){
        next(err);
    }
}