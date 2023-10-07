
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


export const remove = (req, res, next) => {
    
}
export const getUser = (req, res, next) => {
    
}
export const subscribe = (req, res, next) => {
    
}
export const unsubscribe = (req, res, next) => {
    
}
export const like = (req, res, next) => {
    
}
export const dislike = (req, res, next) => {
    
}

