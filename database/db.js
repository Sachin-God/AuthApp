import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export default async function databaseConnection () {
    try {
        await mongoose.connect(process.env.URI)
        console.log('Database Connected')
    } catch (error) {
        console.log(error);
    }
}