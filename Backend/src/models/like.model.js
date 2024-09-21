import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "like should belong to a particular user, user cannot be empty"]
    },
    slide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slide",
        required: [true, "like should belong to a particular slide, slide cannot be empty"]
    }
},{
    timestamps: true
});

export const Like = mongoose.model('Like', LikeSchema);