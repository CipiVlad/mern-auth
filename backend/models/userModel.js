import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

},

    {
        timestamps: true
    }
);

//  'pre' is a mongoose hook --> meaning:'before saving the userSchema ... do this'
userSchema.pre('save', async function (next) {

    // if the password isn't changed in any way, move on --> next();
    if (!this.isModified('password')) {
        next();
    }
    // if the password is modified:
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User;