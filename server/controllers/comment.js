
import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {

    const newComment = new Comment( {...req.body, userId: req.user.id} );
   
    try{
        const savedComment = await newComment.save();
        res.status(200).send(savedComment);

    } catch(err){
        next(err); // Error 
    }
};


export const deleteComment = async (req, res, next) => {
    try{
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);

        if(req.user.id === comment.userId || req.user.id === video.userId ){ // Checking if comments belong to current user or owner of the video
           
            await Comment.findByIdAndDelete(req.params.id); // Finding the cmment by id
            res.status(200).json("The comment has been deleted"); // Comment deleted success message

        }  else{
            return next(createError(403, "You can delete ony your comment"));
        }

    } catch(err){
        next(err); // Error 
    }
};


export const getComments = async (req, res, next) => {
    try{

       const comments = await Comment.find({videoId: req.params.videoId}); // Finding video by passing id
       res.status(200).json(comments); // Sending all comments

    } catch(err){
        next(err); // Error 
    }
};