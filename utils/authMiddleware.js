import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorHandler } from './errorHandler.js';

dotenv.config();

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return next(errorHandler(401, 'Access Denied'));
    }

    jwt.verify(token, process.env.JWTKEY, (err, user) => {
      if (err) {
        return next(errorHandler(403, 'Invalid Token'));
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error); // Forward the error to the error handler
  }
};