import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { getStories } from "./feed.controller.js"

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})
    
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = async(req, res) => {
    const {username, password} = req.body;

    if([username, password].some((value)=>value?.trim()==="")){
        throw new ApiError(400, "All fields are required");
    } 

    const duplicateUser = await User.findOne({username})
    console.log(duplicateUser);
    

    if(duplicateUser) {
        throw new ApiError(400, "User Already exists with this username")
    }
    
    const newUser = await User.create({
        username,
        password,
    })

    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res
    .status(201)
    .json( new ApiResponse(
        201, 
        createdUser, 
        "User registered successfully"
    ))
}

const loginUser = async(req, res) => {
    const {username, password} = req.body
    if(!username) {
        throw new ApiError(400, "username is required")
    }

    const user = await User.findOne({username})

    if(!user) {
        throw new ApiError(404, "user doesnot exit")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = {
        _id : user._id,
        username : user.username,
    }

    const options = {
        maxAge: 86400*1000,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }

    const stories = await getStories(user._id)

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(
        200, 
        {
            user: loggedInUser,
            stories
        },
        "user logged in successfully"
    ))
}

const logoutUser = async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id, 
        {
            $unset: { refreshToken: "" }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out successfully"))
}

const getUser = async(req, res) => {
    const stories = await getStories(req.user._id)
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {
            user: req.user,
            stories
        },
        "user fetched sucessfully"
    ))
}

export {
    registerUser,
    loginUser,
    logoutUser,
    getUser
}
