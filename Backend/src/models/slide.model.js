import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError";

const SlideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name of the slide is mandatory"]
    },
    description: {
        type: String,
        required: [true, "description of the slide is mandatory"]
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
},{
    timestamps: true
});

SlideSchema.pre("validate", async function (next){
    const fields = [this.image, this.video].filter(ele => ele != undefined)
    if(!fields.length) {
        next(new ApiError(400, "slide should contain image or video"))
    }
    else if(fields.length == 2) {
        next(new ApiError(400, "cannot contain image and video both for a single slide"))
    }
    next()
})

export const Slide = mongoose.model('Slide', SlideSchema);