import asyncHandler from 'express-async-handler';

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
    res.status(200).json({ message: "register User" })
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