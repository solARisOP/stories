import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import { Slide } from "../models/slide.model.js"
import { validateData, validateUpdationData } from "../validators/data.validator.js";
import { Story } from "../models/story.model.js";

const createStory = async(req, res) => {
    const { type, slides } = req.body;

    const slideTypes = validateData(type, slides)

    const newSlides = await Promise.all(slides.map((slide, idx)=>
        Slide.create({
            name: question.question,
            description: question.timer ? question.timer : 0,
            ...(slideTypes[idx] == 'image' && {image: slide.url}),
            ...(slideTypes[idx] == 'video' && {video: slide.url}),
        })
    ))

    const story = await Story.create({ owner: req.user._id, storytype: type, slides: newSlides.map(element => element._id) });

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
                as: "relatedSlides"
            }
        },
        {
            $project: {
                owner: 0,
                storytype: 0,
                slides: 0
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

    const x = await validateUpdationData(req, key, data)

    const promise = [];

    let idx = 0;
    for (const Id in data.slides) {
        const slide = await Slide.findById(Id);

        if (data.slides[Id].name) {
            slide.name = data.slides[Id].name;
        }
        if (data.slides[Id].description) {
            slide.description = data.slides[Id].description;
        }
        if (data.slides[Id].url) {
            if(slideTypes[idx] == 'image') {
                slide.image = data.slides[Id].url
            }
            else {
                slide.video = data.slides[Id].url
            }
        }

        promise.push(slide.save());
        idx++
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