/**
 * @swagger
 * tags:
 *   name: Colleagues
 *   description: Colleague API Endpoints
 */

/**
 * @swagger
 * /api/v1/colleagues:
 *   get:
 *     summary: Get all accepted colleagues
 *     description: Retrieve all accepted colleague relationships for the authenticated user, ordered by creation date (newest first)
 *     tags: [Colleagues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Colleagues retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ColleaguesListResponse'
 *             example:
 *               colleagues:
 *                 - uid: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *                   username: "john_doe"
 *                   full_name: "John Doe"
 *                   premium: true
 *                   image_url: "https://example.com/avatar.jpg"
 *                 - uid: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"
 *                   username: "jane_smith"
 *                   full_name: "Jane Smith"
 *                   premium: false
 *                   image_url: null
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Failed to fetch colleagues"
 */

/**
 * @swagger
 * /api/v1/colleagues/requests:
 *   get:
 *     summary: Get pending colleague requests
 *     description: Retrieve all pending colleague requests (both incoming and outgoing) for the authenticated user
 *     tags: [Colleagues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Requests retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ColleagueRequestsResponse'
 *             example:
 *               incoming:
 *                 - username: "new_user"
 *                   created_at: "2024-01-15T10:30:00.000Z"
 *                   rid: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
 *                   uid: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"
 *                   image_url: "https://example.com/avatar2.jpg"
 *               outgoing:
 *                 - username: "potential_colleague"
 *                   created_at: "2024-01-14T15:20:00.000Z"
 *                   rid: "cccccccc-cccc-cccc-cccc-cccccccccccc"
 *                   uid: "dddddddd-dddd-dddd-dddd-dddddddddddd"
 *                   image_url: null
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Failed fetching pending requests"
 */

/**
 * @swagger
 * /api/v1/colleagues/{cuid}:
 *   post:
 *     summary: Send colleague request
 *     description: Send a colleague request to another user by their UID
 *     tags: [Colleagues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cuid
 *         required: true
 *         schema:
 *           type: string
 *         description: Target user's UID to send request to
 *         example: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *     responses:
 *       201:
 *         description: Request sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: "Colleague request sent successfully to john_doe"
 *       400:
 *         description: Bad request - Invalid parameters or existing relationship
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_id:
 *                 summary: Missing addressee ID
 *                 value:
 *                   error: "Addressee ID is required"
 *               self_request:
 *                 summary: Cannot request yourself
 *                 value:
 *                   error: "Cannot send request to yourself"
 *               existing_relationship:
 *                 summary: Relationship already exists
 *                 value:
 *                   error: "Relationship already exists with status: accepted"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Failed to send colleague request"
 */

/**
 * @swagger
 * /api/v1/colleagues/accept/{rid}:
 *   put:
 *     summary: Accept colleague request
 *     description: Accept a pending colleague request by relationship ID. Only the addressee can accept requests.
 *     tags: [Colleagues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rid
 *         required: true
 *         schema:
 *           type: string
 *         description: Relationship ID of the request to accept
 *         example: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
 *     responses:
 *       200:
 *         description: Request accepted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: "Colleague request john_doe accepted"
 *       400:
 *         description: Request is not pending
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Request is already accepted"
 *       403:
 *         description: Not authorized to accept this request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Not authorized to accept this request"
 *       404:
 *         description: Request not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Request not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Failed to accept colleague request"
 */

/**
 * @swagger
 * /api/v1/colleagues/decline/{rid}:
 *   put:
 *     summary: Decline colleague request
 *     description: Decline a pending colleague request by relationship ID. Only the addressee can decline requests.
 *     tags: [Colleagues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rid
 *         required: true
 *         schema:
 *           type: string
 *         description: Relationship ID of the request to decline
 *         example: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
 *     responses:
 *       200:
 *         description: Request declined successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: "Colleague request from john_doe declined"
 *       400:
 *         description: Request is not pending
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Request is already declined"
 *       403:
 *         description: Not authorized to decline this request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Not authorized to decline this request"
 *       404:
 *         description: Request not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Request not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Failed to decline colleague request"
 */

/**
 * @swagger
 * /api/v1/colleagues/block/{uid}:
 *   put:
 *     summary: Block a user
 *     description: Block a user by their UID. This will create or update an existing relationship to blocked status.
 *     tags: [Colleagues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to block
 *         example: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *     responses:
 *       200:
 *         description: User blocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: "Colleague john_doe blocked successfully"
 *       400:
 *         description: Cannot block yourself
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Cannot block yourself"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Failed to block user"
 */

/**
 * @swagger
 * /api/v1/colleagues/unblock/{rid}:
 *   put:
 *     summary: Unblock a user
 *     description: Unblock a user by removing the blocked relationship. Only the blocker can unblock.
 *     tags: [Colleagues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rid
 *         required: true
 *         schema:
 *           type: string
 *         description: Relationship ID of the blocked relationship to remove
 *         example: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
 *     responses:
 *       200:
 *         description: User unblocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: "Colleague ffffffff-ffff-ffff-ffff-ffffffffffff unblocked successfully"
 *       400:
 *         description: User is not blocked
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "User is not blocked"
 *       403:
 *         description: Not authorized to unblock this user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Not authorized to unblock this user"
 *       404:
 *         description: Relationship not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Relationship not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Failed to unblock user"
 */

/**
 * @swagger
 * /api/v1/colleagues/blocked:
 *   get:
 *     summary: Get all blocked users
 *     description: Retrieve all users blocked by the authenticated user, ordered by block date (newest first)
 *     tags: [Colleagues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Blocked users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlockedUsersResponse'
 *             example:
 *               blocked:
 *                 - username: "blocked_user"
 *                   full_name: "Blocked User"
 *                   blocked_at: "2024-01-15T10:30:00.000Z"
 *                   rid: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
 *                   uid: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"
 *                   image_url: null
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Failed fetching blocked users"
 */

/**
 * @swagger
 * /api/v1/colleagues/{cuid}:
 *   delete:
 *     summary: Remove colleague relationship
 *     description: Remove an accepted colleague relationship. Either party can remove the relationship.
 *     tags: [Colleagues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cuid
 *         required: true
 *         schema:
 *           type: string
 *         description: Colleague's UID to remove relationship with
 *         example: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *     responses:
 *       200:
 *         description: Colleague relationship removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: "Colleague ffffffff-ffff-ffff-ffff-ffffffffffff removed successfully"
 *       404:
 *         description: No existing relationship found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "No existing relationship found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Failed to remove colleague relationship"
 */

/**
 * @swagger
 * /api/v1/colleagues/search:
 *   get:
 *     summary: Search for users to add as colleagues
 *     description: Search for users by username or full name. Excludes current colleagues, blocked users, and users with pending requests.
 *     tags: [Colleagues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query (username or full name)
 *         example: "john"
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserSearchResult'
 *             example:
 *               - uid: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *                 username: "john_doe"
 *                 full_name: "John Doe"
 *                 image_url: "https://example.com/avatar.jpg"
 *                 status: null
 *               - uid: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"
 *                 username: "john_smith"
 *                 full_name: "John Smith"
 *                 image_url: null
 *                 status: "pending"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Failed searching users"
 */
