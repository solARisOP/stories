import dotenv from "dotenv"
dotenv.config({
    path:'./.env'
})
import { ConnectDB } from "./config/db.js";
import { app } from "./app.js";

ConnectDB()
.then(()=>{
    app.listen(process.env.PORT||9000, console.log(`Listening on ${process.env.PORT||9000}...`));
})
.catch(err=>{console.log(err)});