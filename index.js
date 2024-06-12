import express from 'express'
import dotenv from 'dotenv'
import databaseConnection from './database/db.js'
import authRoutes from './Routes/authRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT || 8080
dotenv.config()
databaseConnection()
app.use(express.json()) // is used in an Express.js application to parse incoming JSON payloads.
//This middleware is essential for handling JSON data in HTTP requests, such as when a client sends data to your server via a POST request with a JSON body.
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true // Allow credentials (cookies, authorization headers, TLS client certificates)
}))

app.use('/api/auth', authRoutes)
app.use((req, res, next) => {
    console.log(req.cookies);
    next();
  });
app.use('/api/user/', userRoutes)

app.listen(port, ()=> {
    console.log(`Server running at ${port}`);
})


// middleWare to handle Errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        statusCode,
        message,
        success: false
    })
})
