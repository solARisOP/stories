import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Slide } from "../models/slide.model.js"
import { 
    validateData, 
    validateUpdationData 
} from "../validators/data.validator.js";
import { Story } from "../models/story.model.js";
import mongoose from "mongoose";

const createStory = async(req, res) => {
    const { type, slides } = req.body;

    const slideTypes = await validateData(type, slides)

    const newSlides = await Promise.all(slides.map((slide, idx)=>
        Slide.create({
            name: slide.name,
            description: slide.description,
            ...(slideTypes[idx] == 'image' && {image: slide.url}),
            ...(slideTypes[idx] == 'video' && {video: slide.url}),
        })
    ))

    const newStory = await Story.create({ owner: req.user._id, storytype: type, slides: newSlides.map(element => element._id) });
    
    const story = {_id : newStory._id, slide: newSlides[0], owner: newStory.owner, storytype: newStory.storytype}
    
    return res
        .status(200)
        .json(new ApiResponse(
            201,
            story,
            "story created succcessfully"
        ))
}

const getStory = async(req, res) => {
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

const deleteStory = async(req, res) => {
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

const updateStory = async(req, res) => {
    const { key } = req.params;
    const data = req.body

    const slideTypes = await validateUpdationData(req.user, key, data)

    const promise = [];

    for (const Id in data.slides) {
        const slide = await Slide.findById(Id);

        if (data.slides[Id].name) {
            slide.name = data.slides[Id].name;
        }
        if (data.slides[Id].description) {
            slide.description = data.slides[Id].description;
        }
        if (data.slides[Id].url) {
            if(slideTypes[Id] == 'image') {
                slide.image = data.slides[Id].url
            }
            else {
                slide.video = data.slides[Id].url
            }
        }
        promise.push(slide.save());
    }

    if(data.type) {
        promise.push(Story.findByIdAndUpdate(key, {type: data.type}));
    }
    await Promise.all(promise)

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