import jsonwebtoken from 'jsonwebtoken';

const JWT_ACCESS_EXPTIME = process.env.JWT_ACCESS_EXPTIME || "15m";
const JWT_REFRESH_EXPTIME = process.env.JWT_REFRESH_EXPTIME || "7d";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "JWT_accessToken_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "JWT_refreshToken_secret";

export function generateAccessToken(payload) {
  return jsonwebtoken.sign(payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPTIME });
}

export function generateRefreshToken(payload) {
  return jsonwebtoken.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPTIME });
}