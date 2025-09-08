/**
 * @swagger
 * tags:
 *   name: Wines
 *   description: Wines API Endpoints
 */

/**
 * @swagger
 * /api/v1/wines:
 *   get:
 *     summary: Get all user wines
 *     description: Retrieve all wines in the authenticated user's to-drink collection, ordered by ID (ascending)
 *     tags: [Wines]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wines retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WinesListResponse'
 *             example:
 *               wines:
 *                 - wid: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *                   denomination: "Chianti Classico DOCG"
 *                   winemaker: "Castello di Brolio"
 *                   vintage: 2019
 *                 - wid: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"
 *                   denomination: "Barolo DOCG"
 *                   winemaker: "Giacomo Conterno"
 *                   vintage: 2018
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
 *               error: "Internal server error"
 */

/**
 * @swagger
 * /api/v1/wines/{wid}:
 *   get:
 *     summary: Get specific wine by ID
 *     description: Retrieve a specific wine from the user's to-drink collection by its ID. Users can only access their own wines.
 *     tags: [Wines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: wid
 *         required: true
 *         schema:
 *           type: string
 *         description: Wine ID (UUID)
 *         example: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *     responses:
 *       200:
 *         description: Wine retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WineResponse'
 *             example:
 *               wid: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *               denomination: "Chianti Classico DOCG"
 *               winemaker: "Castello di Brolio"
 *               vintage: 2019
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       404:
 *         description: Wine not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Wine ffffffff-ffff-ffff-ffff-ffffffffffff not found"
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
 * /api/v1/wines:
 *   post:
 *     summary: Add new wine to collection
 *     description: Add a new wine to the authenticated user's to-drink collection
 *     tags: [Wines]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WineCreateRequest'
 *           example:
 *             denomination: "Chianti Classico DOCG"
 *             winemaker: "Castello di Brolio"
 *             vintage: 2019
 *     responses:
 *       201:
 *         description: Wine added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WineResponse'
 *             example:
 *               wid: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *               denomination: "Chianti Classico DOCG"
 *               winemaker: "Castello di Brolio"
 *               vintage: 2019
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Denomination is required"
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
 *               error: "Internal server error"
 */

/**
 * @swagger
 * /api/v1/wines/{wid}:
 *   delete:
 *     summary: Delete wine from collection
 *     description: Remove a wine from the authenticated user's to-drink collection. Users can only delete their own wines.
 *     tags: [Wines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: wid
 *         required: true
 *         schema:
 *           type: string
 *         description: Wine ID (UUID)
 *         example: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *     responses:
 *       200:
 *         description: Wine deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: "Wine ffffffff-ffff-ffff-ffff-ffffffffffff successfully deleted"
 *       400:
 *         description: Missing wine ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Missing wine ID"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       404:
 *         description: Wine not found or unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Wine not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Internal Server Error"
 */
