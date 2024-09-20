import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "bookmark should belong to a particular user, user cannot be empty"]
    },
    slide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slide",
        required: [true, "Slide cannot be empty"]
    }
},{
    timestamps: true
});

export const Bookmark = mongoose.model('Bookmark', BookmarkSchema);