import mongoose, { Schema } from 'mongoose'

const userSchema: Schema = new mongoose.Schema<any>({
    email: {
        trim: true,
        required: true,
        type: String,
        unique: [true, 'Email already exists!'],
    },
    mobile: {
        trim: true,
        required: true,
        type: String
    },
    fullname: {
        trim: true,
        required: true,
        type: String
    },
    username: {
        trim: true,
        unique: [true, 'Username already exists!'],
        required: true,
        type: String
    },
    password: {
        trim: true,
        required: true,
        minlength: [5, "Password size must be atleast of 5 character."],
        type: String
    },
    token: {
        type: String
    }

}, { collection: 'user_masters' })

const UserModel = mongoose.model('user', userSchema)
export default UserModel