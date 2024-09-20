import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const StorieSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "storie should belong to a particular user, user cannot be empty"]
    },
    storietype:{
        type: String,
        trim: true,
        enum: [ "food", "health and fitness", "travel", "movie", "education"],
        required: [true, "type of a storie is required to create a storie"]
    },
    slides:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slide",
    }]
},{
    timestamps: true
});

StorieSchema.pre('validate', function(next){
    if(this.slides.length < 3) {
        return next(new ApiError(400, "storie should contain atleast three slides"));
    }
    if(this.slides.length > 6) {
        return next(new ApiError(400, "storie should contain more than six slides"));
    }
    next();
})

export const Storie = mongoose.model('Storie', StorieSchema);