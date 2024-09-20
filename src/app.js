import "express-async-errors"
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express()

//middlwares
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static('public'))
app.use(cookieParser())


// routes import
import userRouter from "./routes/user.routes.js";
import errorHandeler from "./middlewares/errorHandeller.middleware.js"


// routes declaration
app.use("/api/v1/users", userRouter)

app.get('/', async(_, res)=>{
    return res
    .status(200)
    .json({message : 'hello'});
})


//error handeller
app.use(errorHandeler)


export { app }