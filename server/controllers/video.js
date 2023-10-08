import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) =>{
    const newVideo = new Video({ userId: req.user.id, ...req.body});
    try{
        const savedVideo = await newVideo.save(); // Saving new video into DB
        res.status(200).json(savedVideo); // Sending new video
        
    } catch(err){
        next(err); // Error
    }
};

export const updateVideo = async (req, res, next) =>{
    try{
        const video = await Video.findById(req.params.id); //  Finding the video by id
        if(!video) return next(createError(404, "Video not found!")); // Video not found 

        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,{
                $set: req.body,
            }, { new: true }
            );
            res.status(200).json(updateVideo); //  Sending updated video
        } else{
            return next(createError(403, "You can update only you video!"));
        }

    } catch(err){
        next(err); // Error
    }
};

export const deleteVideo = async (req, res, next) =>{
    try{
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404, "Video not found!"));

        if(req.user.id === video.userId){
           await Video.findByIdAndUpdate
           (
                req.params.id, // Finding video by id
            );
            res.status(200).json("The Video has been deleted");  // Video delete success message
        } else{
            return next(createError(403, "You can delete only you video!"));
        }
    } catch(err){
        next(err); // Error
    }
};

export const getVideo = async (req, res, next) =>{
    try{
        const video = await Video.findById(req.params.id); // Finding the video by id
        res.status(200).json(video); // Sending the user 
    } catch(err){
        next(err); // Error
    }
};

export const addView = async (req, res, next) =>{
    try{
        await Video.findByIdAndUpdate(req.params.id,{
            $inc: {views: 1}
        }); // Finding the video by id and incrementing views
        res.status(200).json("View has been increased"); // View increment success message 
    } catch(err){
        next(err); // Error
    }
};


export const random = async (req, res, next) =>{
    try{
        const videos = await Video.aggregate( [ { $sample: { size: 40 } }] ); // Finding the random videos by aggregate method
        res.status(200).json(videos); // Sending the random videos 
    } catch(err){
        next(err); // Error
    }
};


export const trend = async (req, res, next) =>{
    try{
        const videos = await Video.find().sort( { views: -1 } ); // Finding the videos having most views(-1) by sort method
        res.status(200).json(videos); // Sending the trendind videos 
    } catch(err){
        next(err); // Error
    }
};

export const sub = async (req, res, next) =>{
    try{
      const user = await User.findById(req.user.id);
      const subscribedChannels = user.subscribedUsers;

      const list = await Promise.all(
        subscribedChannels.map(channelId => {
            return Video.find({ userId: channelId}); 
        })
      );

      res.status(200). json(list.flat().sort((a,b) => b.createdAt - a.createdAt)); // Sending all newset (sort) subscribed videos & avoiding MD array by javascript flat

    } catch(err){
        next(err); // Error
    }
};



