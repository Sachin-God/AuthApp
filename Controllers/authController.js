import User from "../database/Models/User.js";
import bcrypt from 'bcrypt'
import { errorHandler } from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const SignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(401).json({
                message: ' User Already Exists'
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({name, email, password: hashedPassword})
            await user.save()
            return res.status(201).json({
                message: 'User Created Successfully'
            })
        }
    } catch (error) {
        next(error)
    }
}

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: 'User Not Found!'
            })
        }

        const hashed = await bcrypt.compare(password, user.password)
        if (!hashed) {
            next(errorHandler(401, 'Invalid Password'))
        } else {
            const { password : hashedPassword, ...rest} = user._doc;
            const token = jwt.sign({ id: user._id }, process.env.JWTKEY, { expiresIn: '1h' });
            res.cookie('accessToken', token, { httpOnly: true, secure: false })
            .status(200)
            .json({
              message: 'Logged in successfully',
              rest
            });

        }
    } catch (error) {
        next(error)
    }
}


export const Google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            // Existing user found
            const { password : hashedPassword, ...rest} = user._doc;
            const token = jwt.sign({ id: user._id }, process.env.JWTKEY);
            res.cookie('accessToken', token, { httpOnly: true }).status(200).json({
                message: 'Logged in Successfully',
                rest
            });
        } else {
            // New user registration
            const hashedPassword = await bcrypt.hash(Math.floor().toString(36).slice(-8) + Math.floor().toString(36).slice(-8), 10);
            const newUser = new User({ name: req.body.name.split(" ").join(""), email: req.body.email, password: hashedPassword, avatar: req.body.avatar });
            await newUser.save();
        }
    } catch (error) {
        next(error);
        console.log(error);
    }
};

export const signOut = async (req, res, next) => {
    try {
      // Clear the accessToken cookie
      res.clearCookie('accessToken').status(200).json({
        message: 'User signed Out'
      });
    } catch (error) {
      next(error);
    }
  };