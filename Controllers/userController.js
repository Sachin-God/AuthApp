import User from "../database/Models/User.js";
import bcrypt from 'bcrypt'
import { errorHandler } from "../utils/errorHandler.js";
import dotenv from 'dotenv'
dotenv.config()

export const userUpdate = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401,'You can only update your Account'))
    }
    try {
        // there may be a case where a user wanna update his pass and also may not wanna
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        const updateduser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set : {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }},
            {new: true}
        )
        const {password, ...rest} = updateduser._doc
        console.log(rest)
        res.status(200).json({
            message: 'User Updated',
            rest
        })
    } catch (error) {
        next(error)
    }
}