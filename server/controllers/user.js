
import { createError } from "../error.js";
import User from "../models/User.js";

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) { // comparing the jwt userid & requested userid
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { // Finding by id & update
                $set: req.body, // Updating DB
            }, { new: true }
            
            );
            res.status(200).json(updatedUser); // Sending the updated user
        } catch(err){
            next(err); // Error
        }

    } else{
        return next(createError(403, "You can update only your account!"));
    }
};


export const remove = async (req, res, next) => {
    if (req.params.id === req.user.id) { // comparing the jwt userid & requested userid
        try{
            await User.findByIdAndDelete(req.params.id // Finding by id & delete
            );
            res.status(200).json("User has been deleted!"); // User deleted message
        } catch(err){
            next(err); // Error
        }

    } else{
        return next(createError(403, "You can update only your account!")); 
    }
};


export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id); // Finding the user by id
        res.status(200).json(user); // Sending the user 
    } catch(err){
        next(err); // Error
    }
};


export const subscribe = async (req, res, next) => {
    try{
        await User.findByIdAndUpdate(req.user.id, { 
            $push: {subscribedUsers: req.params.id}
        });

        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: 1},
        });

        res.status(200).json("Subscription Successfull"); // Subscription success message

    } catch(err){
        next(err); // Error 
    }
};


export const unsubscribe = async (req, res, next) => {
    try{
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {subscribedUsers: req.params.id}
        });

        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: -1},
        });

        res.status(200).json("UnSubscription Successfull"); // Unsubscription success message

    } catch(err){
        next(err); // Error
    }
};


export const like = async (req, res, next) => {
    try{

    } catch(err){
        next(err)
    }
};


export const dislike = async (req, res, next) => {
    try{

    } catch(err){
        next(err)
    }
};

