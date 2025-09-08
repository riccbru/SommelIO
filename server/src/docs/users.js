/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User API Endpoints
 */

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     summary: Get current user profile
 *     description: Retrieve the authenticated user's profile information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *             example:
 *               admin: false
 *               premium: true
 *               username: "john_doe"
 *               full_name: "John Doe"
 *               email: "john@example.com"
 *               uid: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *               image_url: "https://example.com/avatar.jpg"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "User ffffffff-ffff-ffff-ffff-ffffffffffff not found"
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
 * /api/v1/users/me/stats:
 *   get:
 *     summary: Get current user statistics
 *     description: Retrieve statistics for the authenticated user's tastings
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserStats'
 *             example:
 *               stats:
 *                 totalTastings: 25
 *                 ratedTastings: 25
 *                 favoriteTastings: 8
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "User ffffffff-ffff-ffff-ffff-ffffffffffff not found"
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
 * /api/v1/users/{uid}:
 *   get:
 *     summary: Get user profile by UID
 *     description: Retrieve a user's public profile information. Users can only access their own profile data.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User's unique identifier (UUID)
 *         example: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPublicProfile'
 *             example:
 *               username: "john_doe"
 *               full_name: "John Doe"
 *               uid: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *               image_url: "https://example.com/avatar.jpg"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       403:
 *         description: Forbidden - Can only access own user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "You can only access your own user data"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "User ffffffff-ffff-ffff-ffff-ffffffffffff not found"
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
 * /api/v1/users/{uid}/stats:
 *   get:
 *     summary: Get user statistics by UID
 *     description: Retrieve statistics for another user's tastings. Cannot access own stats (use /me/stats instead). Blocked users are not accessible.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Target user's unique identifier (UUID)
 *         example: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *     responses:
 *       200:
 *         description: User profile and statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfileWithStats'
 *             example:
 *               user:
 *                 admin: false
 *                 premium: true
 *                 username: "jane_doe"
 *                 full_name: "Jane Doe"
 *                 email: "jane@example.com"
 *                 uid: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *                 image_url: "https://example.com/avatar2.jpg"
 *               stats:
 *                 totalTastings: 15
 *                 ratedTastings: 15
 *                 favoriteTastings: 5
 *       400:
 *         description: Bad request - Cannot use this endpoint for own stats
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Use /me/stats for your own stats"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       403:
 *         description: Forbidden - User is blocked or not available
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "This user is not available"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "User ffffffff-ffff-ffff-ffff-ffffffffffff not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Internal server error"
 */
