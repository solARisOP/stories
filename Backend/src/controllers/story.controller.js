import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Slide } from "../models/slide.model.js"
import {
    validateData,
    validateUpdationData
} from "../validators/data.validator.js";
import { Story } from "../models/story.model.js";
import mongoose from "mongoose";
import { Bookmark } from "../models/bookmark.model.js";
import { Like } from "../models/like.model.js";

const createStory = async (req, res) => {
    const { type, slides } = req.body;

    const slideTypes = await validateData(type, slides)

    const newSlides = await Promise.all(slides.map((slide, idx) =>
        Slide.create({
            name: slide.name,
            description: slide.description,
            ...(slideTypes[idx] == 'image' && { type: 'image', url: slide.url }),
            ...(slideTypes[idx] == 'video' && { type: 'video', url: slide.url }),
        })
    ))

    const newStory = await Story.create({ owner: req.user._id, storytype: type, slides: newSlides.map(element => element._id) });

    const story = { _id: newStory._id, slide: newSlides[0], owner: newStory.owner, storytype: newStory.storytype }

    return res
        .status(200)
        .json(new ApiResponse(
            201,
            story,
            "story created succcessfully"
        ))
}

const getStory = async (req, res) => {
    const { key } = req.query;

    const story = await Story.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(key)
            }
        },
        {
            $lookup: {
                from: "slides",
                localField: "slides",
                foreignField: "_id",
                pipeline: [
                    {
                        $lookup: {
                            from: "likes",
                            localField: "_id",
                            foreignField: "slide",
                            as: 'likes'
                        }
                    },
                    {
                        $lookup: {
                            from: "bookmarks",
                            localField: "_id",
                            foreignField: "slide",
                            as: 'bookmarks'
                        }
                    },
                    {
                        $addFields: {
                            likedByUser: {
                                $in: [req.user?._id, "$likes.user"]
                            },
                            markedByUser: {
                                $in: [req.user?._id, "$bookmarks.user"]
                            }
                        }
                    },
                    {
                        $addFields: {
                            likes: {
                                $size: "$likes"
                            }
                        }
                    },
                    {
                        $project: {
                            bookmarks: 0
                        }
                    }
                ],
                as: "slides"
            }
        },
        {
            $project: {
                owner: 0
            }
        }
    ])



    if (!story.length) {
        throw new ApiError(404, "story does not exists")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            story[0],
            "story retreived successfully"
        ))
}

const deleteStory = async (req, res) => {
    const { key } = req.params;

    const story = await Story.findById(key);

    if (!story) {
        throw new ApiError(404, "No story exists for this particular id");
    }
    else if (!story.owner.equals(req.user._id)) {
        throw new ApiError(403, "story does not belong to the particular user");
    }

    await Promise.all(story.slides.map(id => Slide.findByIdAndDelete(id)))

    await Story.findByIdAndDelete(story._id)

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {},
            "story deleted successfully"
        ))
}

const updateStory = async (req, res) => {
    const { key } = req.params;
    const data = req.body

    const { urlTypes, slides } = await validateUpdationData(req.user, key, data)

    const promise = [];

    let idx = 0;
    for (const currSlide of data.slides) {
        let slide = Slide({});
        if (currSlide._id) {
            slide = await Slide.findById(currSlide._id);
        }
        slide.name = currSlide.name;
        slide.description = currSlide.description;
        slide.url = currSlide.url
        slide.type = urlTypes[idx++]
        promise.push(slide.save());
    }

    const newSlides = await Promise.all(promise)
    const strIds = newSlides.map(ele => ele._id.toString())
    const story = await Story.findById(key)

    const delPromises = []
    for (const Id of story.slides) {        
        if (!strIds.includes(Id.toString())) {
            delPromises.push(Bookmark.deleteMany({slide: Id}), Like.deleteMany({slide: Id}), Slide.findByIdAndDelete(Id))
        }
    }
    
    story.type = data.type;
    story.slides = newSlides.map(ele => ele._id);
    delPromises.push(story.save())
    
    await Promise.all(delPromises)

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {},
            "story updated sucessfully"
        ))
}

export {
    createStory,
    getStory,
    deleteStory,
    updateStory
}