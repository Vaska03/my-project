import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [4, 'Username must be at least 4 charakters long'],
        maxlength: [20, 'Username cannot be more than 20 charakters long']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password: {
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 charakters long'],
        maxlength: [20, 'Password cannot be more then 20 charakters long'],

    }
})

const User = model('User', userSchema);
export default User; 