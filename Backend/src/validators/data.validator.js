import { Story } from "../models/story.model.js";
import { ApiError } from "../utils/ApiError.js"

const validateData = async (type, slides, key , user) => {
    let slideIds;
    let story;
    if(user) {
        story = await Story.findById(key)
        if(!story) {
            throw ApiError(404, "no story exists with this particular id")
        }
        else if(!story.owner.equals(user._id)) {
            throw ApiError(403, "story doesnot belong to the particular user")
        }
        slideIds = story.slides.map(ele => ele._id.toString())
    }
    if (!type.trim()) {
        throw new ApiError(400, "story should have a type")
    }
    else if (!["food", "health", "travel", "movie", "education"].includes(type.trim())) {
        throw new ApiError(400, `${type} is a invalid story type`)
    }
    else if (!slides || slides.length < 3) {
        throw new ApiError(400, "story should contain atleast three slides")
    }
    else if (slides.length > 6) {
        throw new ApiError(400, "there cannot be more than 6 slides per story")
    }

    for (const slide of slides) {
        if(user && slide._id) {
            if(!slideIds.includes(slide._id.toString())) {
                throw new ApiError(400, "slide doesnot belong to this story")
            }
        }
        if (!slide.name || !slide.name.trim()) {
            console.log(slide);            
            throw new ApiError(400, "name feild of slide object cannot be empty or undefined")
        }
        else if (!slide.description || !slide.description.trim()) {
            throw new ApiError(400, "description feild of slide object cannot be empty or undefined")
        }
        else if (!slide.url || !slide.url.trim()) {
            throw new ApiError(400, "url feild of slide object cannot be empty or undefined")
        }
        else if (!slide.type || !slide.type.trim() || (slide.type != 'image' && slide.type != 'video')) {
            throw new ApiError(400, `${type} is invalid url type`)
        }
    }

    return story
}

export {
    validateData
}