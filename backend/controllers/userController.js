import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
//@ description Auth User/set token
//@ route       POST   /api/user/auth
//@ access      public
const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Auth User" })

})

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


//@ description logout User
//@ route       POST   /api/users/logout
//@ access      private
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "logout User" })
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