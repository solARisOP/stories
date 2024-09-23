import axios from "axios";
import { ApiError } from "../utils/ApiError.js"
import mongoose from "mongoose"
import { Story } from "../models/story.model.js";

const checkUrlType = async (url, idx) => {
    try {
        const res = await axios.get(url, { responseType: 'blob' });
        const urlType = res.data.type
        if(urlType.startswith('/image')) {
            return "image"
        } 
        else if(urlType.startswith('/video')) {
            return "video"
        }
        else {
            throw new ApiError(400, `${idx} is not a valid url`)
        }
    } catch (error) {
        throw new ApiError(400, `${idx} is not a valid url`)
    }
}

const validateData = async (type, slides) => {
    if (!type.trim()) {
        throw new ApiError(400, "story should have a type")
    }
    else if (!["food", "health and fitness", "travel", "movie", "education"].includes(type.trim())) {
        throw new ApiError(400, `${type} is a invalid story type`)
    }
    else if (!slides || slides.length < 3) {
        throw new ApiError(400, "story should contain atleast three slides")
    }
    else if (slides.length > 6) {
        throw new ApiError(400, "there cannot be more than 6 slides per story")
    }

    let urlTypes = []
    for (let idx = 0; idx < slides.length; idx++) {
        const slide = slides[idx];
        if (!slide.name || !slide.name.trim()) {
            throw new ApiError(400, "name feild of slide object cannot be empty or undefined")
        }
        else if (!slide.description || !slide.description.trim()) {
            throw new ApiError(400, "description feild of slide object cannot be empty or undefined")
        }
        else if (!slide.url || !slide.url.trim()) {
            throw new ApiError(400, "url feild of slide object cannot be empty or undefined")
        }
        // const urlType = await checkUrlType(slide.url, idx)
        urlTypes.push("image")
    }

    return urlTypes
}

const validateUpdationData = async (user, key, data) => {

    const story = await Story.findById(key);

    if (!story) {
        throw new ApiError(404, "No story exists for this particular id");
    }
    else if (!story.owner.equals(user._id)) {
        throw new ApiError(403, "story does not belong to the particular user");
    }
    else if(data.type && !["food", "health and fitness", "travel", "movie", "education"].includes(data.type)) {
        throw new ApiError(400, `${data.type} is invalid story type`)
    }

    let urlTypes = {}
    for (const Id in data.slides) {
        const slide = data.slides[Id]
        if (slide.name && !slide.name.trim()) {
            throw new ApiError(400, "name cannot be empty for a slide")
        }
        const sId = new mongoose.Types.ObjectId(Id)
        if (!story.slides.includes(sId)) {
            throw new ApiError(400, `slide ${Id} does not belong to this particular story`)
        }
        if (slide.url) {
            if(!slide.url.trim()) {
                throw new ApiError(400, "url feild of slide object cannot be empty or undefined")
            }
            else {
                // const urlType = await checkUrlType(slide.url, Id)
                urlTypes[Id] = "image"
            }
        }
    }
    
    return urlTypes
}

export {
    validateData,
    validateUpdationData
}