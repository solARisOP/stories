import { Slide } from "../models/slide.model.js"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Bookmark } from "../models/bookmark.model.js"
import { Story } from "../models/story.model.js"

const likeSlide = async (req, res) => {
    const {key} = req.params

    const slide = await Slide.findById(key)

    if(!slide) {
        throw new ApiError(400, "No slide exists for this corresponding id or has already been deleted")
    }

    const duplicateLike = await Like.findOne({user: req.user._id, slide: slide._id})

    if(duplicateLike) {
        throw new ApiError(400, "User has already liked the slide")
    }

    await Like.create({user: req.user._id, slide: slide._id})

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "user liked the slide successfully"
    ))
}

const unlikeSlide = async (req, res) => {
    const {key} = req.params

    const slide = await Slide.findById(key)

    if(!slide) {
        throw new ApiError(400, "No slide exists for this corresponding id or has already been deleted")
    }

    const like = await Like.findOneAndDelete({user: req.user._id, slide: slide._id})

    if(!like) {
        throw new ApiError(400, "User has not liked the slide")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "user unliked the slide successfully"
    ))
}

const bookmarkSlide = async (req, res) => {
    const {storyId, slideId} = req.params

    const story = await Story.findById(storyId)

    const slide = await Slide.findById(slideId)

    if(!slide) {
        throw new ApiError(400, "No slide exists for this corresponding id")
    }
    else if(!story) {
        throw new ApiError(400, "No story exists for this corresponding id or has already been deleted")
    }

    const duplicateMark = await Bookmark.findOne({user: req.user._id, slide: slide._id})
    if(duplicateMark) {
        throw new ApiError(400, "User has already bookmarked the slide")
    }
    
    await Bookmark.create({user: req.user._id, slide: slide._id, story: story._id})
    
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "user bookmarked the slide successfully"
    ))
}

const unmarkSlide = async (req, res) => {
    const {key} = req.params

    const slide = await Slide.findById(key)

    if(!slide) {
        throw new ApiError(400, "No slide exists for this corresponding id")
    }

    const mark = await Bookmark.findOneAndDelete({user: req.user._id, slide: slide._id})

    if(!mark) {
        throw new ApiError(400, "User has not bookmarked the slide")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "user unmarked the slide successfully"
    ))
}

const downloadSlide = async (req, res) => {
    
}

export {
    likeSlide,
    unlikeSlide,
    bookmarkSlide,
    unmarkSlide
}

