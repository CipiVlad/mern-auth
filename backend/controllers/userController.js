//@ description Auth User/set token
//@ route       POST   /api/user/auth
//@ access      public
const authUser = (req, res) => {
    res.status(200).json({ message: "Auth User" })
}

export {
    authUser,
}