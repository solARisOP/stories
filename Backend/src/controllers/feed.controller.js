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
            $skip: skip
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

    let next = -1;
    if(stories.length == 5) {
        stories.splice(4);
        next = skip + 4;
    }

    return {next, stories};
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
            $limit: 5
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

    let next = -1;
    if(marks.length == 5) {
        marks.splice(4);
        next = skip + 4;
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {
            marks,
            next
        },
        "bookmarks fetched successfully"
    ))
}

const getFeedStories = async (req, res) => {
    const storyTypes = [ "food", "health and fitness", "travel", "movie", "education"];
    const promises = storyTypes.map(type => getStories(type, 0))
    if(req.user) {
        promises.push(getStories(req.user._id, 0))
    }
    
    const data = await Promise.all(promises)
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

    const {next, stories} = await getStories(type, parseInt(skip) || 0)

    if(!stories.length) {
        throw new ApiError(400, `no more stories avaliable of type ${type}`)
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {
            stories,
            next
        },
        `${type} stories fetched successfully`
    ))
}

export {
    getBookmarks,
    getFeedStories,
    getStoriesType
}