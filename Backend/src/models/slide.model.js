import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const SlideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name of the slide is mandatory"]
    },
    description: {
        type: String,
        required: [true, "description of the slide is mandatory"]
    },
    type: {
        type: String,
        enum: ["image", "video"],
        required: [true, "type of a slide is required to create a slide"]
    },
    url: {
        type: String,
    }
},{
    timestamps: true
});

SlideSchema.pre("validate", async function (next){
    const fields = [this.url, this.type].filter(ele => ele !== undefined && ele !== null)
    if(!fields.length) {
        next(new ApiError(400, "slide should contain an url of image or video"))
    }
    next()
})

export const Slide = mongoose.model('Slide', SlideSchema);