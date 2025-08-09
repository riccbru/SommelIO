import jsonwebtoken from 'jsonwebtoken';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "JWT_accessToken_secret";

export function isAuthZ(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing token' });
    try {
        const payload = jsonwebtoken.verify(token, JWT_ACCESS_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: err || 'Invalid or expired token' });
    }
}