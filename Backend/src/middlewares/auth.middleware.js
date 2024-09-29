import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"

export const verifyJWT = async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        // const ref = req.cookies?.refreshToken

        if(!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password")
    
        // if(!user || user.refreshToken != ref) {
        //     throw new ApiError(401, "Invalid Access Token")
        // }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, "Invalid access token");
    }
}