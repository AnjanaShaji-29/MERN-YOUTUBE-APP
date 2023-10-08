import express from "express";
import { dislike, getUser, like, remove, subscribe, unsubscribe, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// update user
router.put("/:id", verifyToken, update);

// delete user
router.delete("/:id", verifyToken, remove);

// get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

//Unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

// like a video
router.put("/like/:videoId", verifyToken, like);
 
// Dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);


export default router;