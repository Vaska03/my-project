import jwt from 'jsonwebtoken';

const SECRET = 'mysecretkey';

export default function userMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'You must be logged in!' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token!' });
    }
}
