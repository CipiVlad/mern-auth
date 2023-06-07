import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    //add userId to Token to payload
    //provide JWT secret
    //expiration date option
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' })

    //save to cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict', //--> prevent CSRF Attacks
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}

export default generateToken