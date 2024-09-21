import { Router } from "express";
import {
    getBookmarks,
    getFeedStories,
    getStoriesType
} from "../controllers/feed.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

//routes
router.route('/bookmarks').get(verifyJWT, getBookmarks)

router.route('/feed-stories').get(verifyJWT, getFeedStories)

router.route('/stories/:type').get(verifyJWT, getStoriesType)

export default router