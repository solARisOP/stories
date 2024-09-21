import { Router } from "express";
import {
    likeSlide,
    unlikeSlide,
    bookmarkSlide,
    unmarkSlide
} from "../controllers/slide.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

//routes
router.route('/like-slide/:key').post(verifyJWT, likeSlide)

router.route('/unlike-slide/:key').delete(verifyJWT, unlikeSlide)

router.route('/mark-slide/:storyId/:slideId').post(verifyJWT, bookmarkSlide)

router.route('/unmark-slide/:key').delete(verifyJWT, unmarkSlide)

export default router