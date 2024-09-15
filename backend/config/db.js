import mongoose from "mongoose";
import { dbURL } from "./config.js";
import chalk from "chalk";
const connectDB = async()=>{
    try{

        await mongoose.connect(dbURL);
        console.log(`${chalk.green.italic('Connected to the Database.')}`);

    }catch(e){
        console.log(`${chalk.red.italic('Error Connecting to the Database..')}`);
    }
}


export default connectDB;



