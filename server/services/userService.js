import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const SECRET = 'mysecretkey';

export async function register(username, email, password) {
    const existing = await User.findOne({email});

    if (existing) {
        throw new Error('Email  already exists');
    };

   


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    return createToken(user);
}

export async function login(email, password) {
    const user = await User.findOne({email});

    if (!user) {
        throw new Error('Invalid email or password!');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new Error('Invalid email or password!');
    }

    return createToken(user);

}

function createToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        
    };

    return jwt.sign(payload, SECRET, {expiresIn: '2h'});
}