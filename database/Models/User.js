import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email : {
        type:String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        minLength: 6
    },
    avatar: {
        type:String,
        default: 'https://image.tmdb.org/t/p/original/pjDmyEXe00j8HoStZ6BdFEL9sDe.jpg'
    }
}, {timestamps: true})

export default mongoose.model('User', userSchema);