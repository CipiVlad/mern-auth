import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
connectDB();
// import cors from 'cors'
import cookieParser from "cookie-parser";

import userRoutes from './routes/userRoutes.js'
const app = express();

const port = process.env.PORT || 5000;

// app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('server is ready')
})
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => (`Server listening on ${port}`))