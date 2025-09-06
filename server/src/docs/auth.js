/**
 * @swagger
 * tags:
 *   name: AuthZ
 *   description: Authorization API Endpoints
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate user with username and password. Returns JWT Access Token and sets Refresh Token as httpOnly cookie.
 *     tags: [AuthZ]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             username: "john_doe"
 *             password: "password"
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             description: Refresh token set as httpOnly cookie
 *             schema:
 *               type: string
 *               example: "refreshToken=<JWT_REFRESH_TOKEN>; HttpOnly; Secure; SameSite=Strict; Max-Age=604800"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               token: "<JWT_ACCESS_TOKEN>"
 *       400:
 *         description: Invalid request body (validation error)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Username/Password is required"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Invalid username and/or password"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Internal server error"
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: User Signup
 *     description: Register a new user account. All fields are required.
 *     tags: [AuthZ]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *           example:
 *             full_name: "John Doe"
 *             username: "john_doe"
 *             email: "john@example.com"
 *             birthdate: "1970-01-01"
 *             password: "password"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignupResponse'
 *             example:
 *               uid: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *               full_name: "John Doe"
 *               username: "john_doe"
 *               email: "john@example.com"
 *               birthdate: "1970-01-01"
 *       400:
 *         description: Invalid request body (validation error)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Full name/Username/Email/Birthdate is required"
 *       409:
 *         description: Username or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Username or email already taken"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Internal server error"
 */

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refresh JWT Access Token
 *     description: Generate a new access token using the refresh token stored in httpOnly cookie. The refresh token is automatically sent by the browser.
 *     tags: [AuthZ]
 *     security: []
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Refresh token stored as httpOnly cookie (automatically sent by browser)
 *     responses:
 *       200:
 *         description: New access token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               token: "<JWT_ACCESS_TOKEN>"
 *       401:
 *         description: Refresh token missing, invalid or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_token:
 *                 summary: Missing refresh token
 *                 value:
 *                   error: "Refresh token required"
 *               invalid_token:
 *                 summary: Invalid refresh token
 *                 value:
 *                   error: "Invalid refresh token"
 *               expired_token:
 *                 summary: Expired refresh token
 *                 value:
 *                   error: "Refresh token expired"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Internal server error"
 */

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: User Logout
 *     description: Logout user by clearing the refresh token cookie. No request body needed.
 *     tags: [AuthZ]
 *     security: []
 *     responses:
 *       204:
 *         description: Logout successful - refresh token cookie cleared
 *         headers:
 *           Set-Cookie:
 *             description: Clears the refreshToken cookie
 *             schema:
 *               type: string
 *               example: "refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
 */
