// middleware to protect our routes with the cookie we created

//get payload from token which is the userId
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    //check for cookie
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId.select('-password'))
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Unauthorized! Invalid Token!')
        }
    } else {
        res.status(401)
        throw new Error('Unauthorized! No Token.')
    }
})

export default protect