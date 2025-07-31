import jsonwebtoken, { SignOptions, JwtPayload } from 'jsonwebtoken';

const JWT_ACCESS_EXPTIME = process.env.JWT_ACCESS_EXPTIME || "15m";
const JWT_REFRESH_EXPTIME = process.env.JWT_REFRESH_EXPTIME || "7d";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "JWT_accessToken_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "JWT_refreshToken_secret";

// Define a flexible payload type, but you can replace this with a custom interface
type TokenPayload = string | object | Buffer;

export function generateAccessToken(payload: TokenPayload): string {
  return jsonwebtoken.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPTIME,
  } as SignOptions);
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jsonwebtoken.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPTIME,
  } as SignOptions);
}
