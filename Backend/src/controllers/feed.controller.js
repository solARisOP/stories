import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Bookmark } from "../models/bookmark.model.js"
import { Story } from "../models/story.model.js"
import mongoose from "mongoose"

const getStories = async(param, skip) => {
    const stories = await Story.aggregate([
        {
            $match : {
                ...(param instanceof mongoose.Types.ObjectId && {owner: param}),
                ...(typeof param === 'string' && {storytype: param})
            }
        },
        {
            $skip: skip || 0
        },
        {
            $limit: 5
        },
        {
            $lookup: {
                from: "slides",
                localField: "slides",
                foreignField: "_id",
                as: "slides",
            }
        },
        {
            $addFields: {
                slide : {
                    $first: "$slides"
                }
            }
        },
        {
            $project: {
                slides: 0
            }
        }
    ])

    return stories;
}

const getBookmarks = async (req, res) => {
    const {skip} = req.query

    let marks = await Bookmark.aggregate([
        {
            $match: {
                user : req.user._id
            }
        },
        {
            $skip: parseInt(skip) || 0
        },
        {
            $limit: 4
        },
        {
            $lookup: {
                from: "slides",
                localField: "slide",
                foreignField: "_id",
                as: "slides"
            }
        },
        {
            $addFields: {
                slide : {
                    $first: "$slides"
                }
            }
        },
        {
            $project: {
                slides: 0
            }
        }
    ])

    if(!marks.length) {
        throw new ApiError(400, "no more bookmarks avaliable")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        marks,
        "bookmarks fetched successfully"
    ))
}

const getFeedStories = async (req, res) => {
    const storyTypes = [ "food", "health", "travel", "movie", "education"];
    const data = await Promise.all(storyTypes.map(type => getStories(type, 0)))

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        data,
        "feed fetched successfully"
    ))
}

const getStoriesType = async (req, res) => {
    const {skip, type} = req.query

    const stories = await getStories(type, parseInt(skip) || 0)

    if(!stories.length) {
        throw new ApiError(400, `no more stories avaliable of type ${type}`)
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        stories,
        `${type} stories fetched successfully`
    ))
}

const getUserStories = async (req, res) => {
    const {skip} = req.query

    const stories = await getStories(req.user._id, parseInt(skip))

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        stories,
        "user stories fetched sucessfully"
    ))
}

export {
    getBookmarks,
    getFeedStories,
    getStoriesType,
    getStories,
    getUserStories
}