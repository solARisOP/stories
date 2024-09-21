import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const StorySchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "story should belong to a particular user, user cannot be empty"]
    },
    storytype:{
        type: String,
        trim: true,
        enum: [ "food", "health and fitness", "travel", "movie", "education"],
        required: [true, "type of a story is required to create a story"]
    },
    slides:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slide",
    }]
},{
    timestamps: true
});

StorySchema.pre('validate', function(next){
    if(this.slides.length < 3) {
        return next(new ApiError(400, "story should contain atleast three slides"));
    }
    if(this.slides.length > 6) {
        return next(new ApiError(400, "story should contain more than six slides"));
    }
    next();
})

export const Story = mongoose.model('Story', StorySchema);