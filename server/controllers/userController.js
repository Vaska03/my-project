import { Router } from 'express';
import { register, login } from '../services/userService.js';

const userController = new Router();

userController.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body;

    try {
        if (!username || !email || !password || !rePassword) {
            return res.status(400).json({ message: 'All fields are required!' })
        }

        if (password !== rePassword) {
            return res.status(400).json({ message: 'Passwords do not match!' })
        }

        const token = await register(username, email, password);
        res.status(201).json({
            message: 'You have registered successfully!',
            token
        });
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
})

userController.post('/login', async (req, res) => {
    
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required'});
        }

        const token = await login(email, password);
        res.status(200).json({
            message: 'You have logged in successfully!',
            token
        });
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
})


export default userController;
