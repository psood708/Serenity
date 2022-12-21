import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth";

const router = express.Router();
//WE are using the main functions

//READ
router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);

//UPDATE
router.patch("/:id/:friendId",verifyToken,addRemoveFriend);

export default router;