import { Router } from "express";
import {
    createStory,
    getStory,
    deleteStory,
    updateStory
} from "../controllers/story.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

//routes
router.route('/create-story').post(verifyJWT, createStory)

router.route('/delete-story/:key').delete(verifyJWT, deleteStory)

router.route('/update-story/:key').patch(verifyJWT, updateStory)

router.route('/get-story').get(getStory)

export default router