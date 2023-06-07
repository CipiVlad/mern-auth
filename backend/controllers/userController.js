import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';


//@ description register User
//@ route       POST   /api/users
//@ access      public
const registerUser = asyncHandler(async (req, res) => {
    //extract user input from registration form
    const { name, email, password } = req.body

    //check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400);
        throw new Error('user already exists')
    }

    //create user 
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.status(200)
})


//@ description Auth User/set token for Login
//@ route       POST   /api/user/auth
//@ access      public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password data')
    }

})

//@ description logout User
//@ route       POST   /api/users/logout
//@ access      private
const logoutUser = asyncHandler(async (req, res) => {
    //destroy cookie by using an empty string
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: "User logged out!" })
})

//@ description get User profile
//@ route       GET   /api/users/profile
//@ access      private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: " Users profile" })
})
//@ description update User profile
//@ route       PUT   /api/users/profile
//@ access      private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "update User" })
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}