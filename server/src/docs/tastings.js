/**
 * @swagger
 * tags:
 *   name: Tastings
 *   description: Tastings API Endpoints
 */

/**
 * @swagger
 * /api/v1/tastings:
 *   get:
 *     summary: Get all user tastings
 *     description: Retrieve all tastings for the authenticated user, sorted by tasting date (newest first). Includes both old and new format tastings.
 *     tags: [Tastings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tastings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TastingsListResponse'
 *             example:
 *               tastings:
 *                 - tid: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *                   full_name: "Chianti Classico Tasting"
 *                   wine_category: "Red Wine"
 *                   favorite: true
 *                   sample_number: "001"
 *                   wine_denomination: "Chianti Classico DOCG"
 *                   winemaker: "Castello di Brolio"
 *                   alcohol_content: 13.5
 *                   vintage: 2019
 *                   wine_temperature: 18.0
 *                   ambient_temperature: 22.0
 *                   tasting_date: "2024-01-15T19:30:00.000Z"
 *                   tasting_location: "Wine Cellar"
 *                   new: true
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
 * /api/v1/tastings/{tid}:
 *   get:
 *     summary: Get specific tasting by ID
 *     description: Retrieve a specific tasting by its ID. Users can only access their own tastings.
 *     tags: [Tastings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         schema:
 *           type: string
 *         description: Tasting ID (UUID)
 *         example: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *     responses:
 *       200:
 *         description: Tasting retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TastingResponse'
 *             example:
 *               tid: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *               full_name: "Chianti Classico Tasting"
 *               wine_category: "Red Wine"
 *               favorite: true
 *               sample_number: "001"
 *               wine_denomination: "Chianti Classico DOCG"
 *               winemaker: "Castello di Brolio"
 *               alcohol_content: 13.5
 *               vintage: 2019
 *               wine_temperature: 18.0
 *               ambient_temperature: 22.0
 *               tasting_date: "2024-01-15T19:30:00.000Z"
 *               tasting_location: "Wine Cellar"
 *               new: true
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       404:
 *         description: Tasting not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Tasting ffffffff-ffff-ffff-ffff-ffffffffffff not found"
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
 * /api/v1/tastings:
 *   post:
 *     summary: Create new tasting
 *     description: Create a new wine tasting record for the authenticated user
 *     tags: [Tastings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TastingCreateRequest'
 *           example:
 *             full_name: "Chianti Classico Tasting"
 *             wine_category_name: "red_wine"
 *             favorite: false
 *             sample_number: "001"
 *             wine_denomination: "Chianti Classico DOCG"
 *             winemaker: "Castello di Brolio"
 *             alcohol_content: "13.5"
 *             vintage: 2019
 *             wine_temperature: "18.0"
 *             ambient_temperature: "22.0"
 *             tasting_date: "2024-01-15"
 *             tasting_time: "19:30"
 *             tasting_location: "Wine Cellar"
 *             new: true
 *     responses:
 *       201:
 *         description: Tasting created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TastingResponse'
 *             example:
 *               tid: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *               full_name: "Chianti Classico Tasting"
 *               wine_category: "Red Wine"
 *               favorite: false
 *               sample_number: "001"
 *               wine_denomination: "Chianti Classico DOCG"
 *               winemaker: "Castello di Brolio"
 *               alcohol_content: 13.5
 *               vintage: 2019
 *               wine_temperature: 18.0
 *               ambient_temperature: 22.0
 *               tasting_date: "2024-01-15T19:30:00.000Z"
 *               tasting_location: "Wine Cellar"
 *               new: true
 *       400:
 *         description: Bad request - Invalid input or wine category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               validation_error:
 *                 summary: Validation error
 *                 value:
 *                   error: "Full name is required"
 *               category_not_found:
 *                 summary: Wine category not found
 *                 value:
 *                   error: "No wine category found for name 'invalid_category'"
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
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /api/v1/tastings/{tid}:
 *   put:
 *     summary: Update tasting
 *     description: Update specific fields of a tasting. Users can only update their own tastings.
 *     tags: [Tastings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         schema:
 *           type: string
 *         description: Tasting ID (UUID)
 *         example: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TastingUpdateRequest'
 *           example:
 *             sample_number: "002"
 *             wine_denomination: "Chianti Classico Riserva DOCG"
 *             winemaker: "Castello di Brolio"
 *             alcohol_content: 14.0
 *             vintage: 2018
 *             wine_temperature: 17.5
 *             ambient_temperature: 21.0
 *             tasting_location: "Tasting Room"
 *             wine_category_name: "red_wine"
 *             tasting_date: "2024-01-16"
 *             tasting_time: "20:00"
 *     responses:
 *       200:
 *         description: Tasting updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TastingResponse'
 *             example:
 *               tid: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *               full_name: "Chianti Classico Tasting"
 *               wine_category: "Red Wine"
 *               favorite: true
 *               sample_number: "002"
 *               wine_denomination: "Chianti Classico Riserva DOCG"
 *               winemaker: "Castello di Brolio"
 *               alcohol_content: 14.0
 *               vintage: 2018
 *               wine_temperature: 17.5
 *               ambient_temperature: 21.0
 *               tasting_date: "2024-01-16T20:00:00.000Z"
 *               tasting_location: "Tasting Room"
 *               new: true
 *       400:
 *         description: Bad request - Invalid input or empty body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_id:
 *                 summary: Missing tasting ID
 *                 value:
 *                   error: "Missing tasting ID"
 *               empty_body:
 *                 summary: Empty update body
 *                 value:
 *                   error: "Body is empty or no valid fields for update"
 *               invalid_category:
 *                 summary: Invalid wine category
 *                 value:
 *                   error: "Invalid wine_category_name"
 *               invalid_vintage:
 *                 summary: Invalid vintage year
 *                 value:
 *                   error: "Vintage year is impossible"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       404:
 *         description: Tasting not found or unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Tasting not found or unauthorized."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /api/v1/tastings/{tid}:
 *   patch:
 *     summary: Toggle tasting favorite status
 *     description: Toggle the favorite status of a tasting. Users can only modify their own tastings.
 *     tags: [Tastings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         schema:
 *           type: string
 *         description: Tasting ID (UUID)
 *         example: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *     responses:
 *       200:
 *         description: Favorite status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TastingResponse'
 *             example:
 *               tid: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *               full_name: "Chianti Classico Tasting"
 *               wine_category: "Red Wine"
 *               favorite: true
 *               sample_number: "001"
 *               wine_denomination: "Chianti Classico DOCG"
 *               winemaker: "Castello di Brolio"
 *               alcohol_content: 13.5
 *               vintage: 2019
 *               wine_temperature: 18.0
 *               ambient_temperature: 22.0
 *               tasting_date: "2024-01-15T19:30:00.000Z"
 *               tasting_location: "Wine Cellar"
 *               new: true
 *       400:
 *         description: Missing tasting ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Missing tasting ID"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       404:
 *         description: Tasting not found or unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Tasting not found or unauthorized."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /api/v1/tastings/{tid}:
 *   delete:
 *     summary: Delete tasting
 *     description: Delete a tasting by its ID. Users can only delete their own tastings.
 *     tags: [Tastings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         schema:
 *           type: string
 *         description: Tasting ID (UUID)
 *         example: "ffffffff-ffff-ffff-ffff-ffffffffffff"
 *     responses:
 *       200:
 *         description: Tasting deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: "Tasting ffffffff-ffff-ffff-ffff-ffffffffffff successfully deleted"
 *       400:
 *         description: Missing tasting ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Missing tasting ID"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       404:
 *         description: Tasting not found or unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Tasting not found or unauthorized."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Internal Server Error"
 */
