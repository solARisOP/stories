import { Router } from "express";
import {
    getBookmarks,
    getFeedStories,
    getStoriesType,
    getUserStories
} from "../controllers/feed.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { checkUser } from "../middlewares/userCheck.middleware.js";

const router = Router()

//routes
router.route('/bookmarks').get(verifyJWT, getBookmarks)

router.route('/feed-stories').get(checkUser, getFeedStories)

router.route('/stories').get(getStoriesType)

router.route('/user-stories').get(verifyJWT ,getUserStories)

export default router