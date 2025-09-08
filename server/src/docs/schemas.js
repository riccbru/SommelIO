// AUTHZ
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: User's username
 *         password:
 *           type: string
 *           description: User's password
 *           minLength: 8
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT access token
 *
 *     SignupRequest:
 *       type: object
 *       required:
 *         - full_name
 *         - username
 *         - email
 *         - birthdate
 *         - password
 *       properties:
 *         full_name:
 *           type: string
 *           description: User's full name
 *         username:
 *           type: string
 *           description: User's username
 *         email:
 *           type: string
 *           description: User's email
 *         birthdate:
 *           type: string
 *           description: User's birthdate
 *         password:
 *           type: string
 *           description: User's password
 *           minLength: 8
 *
 *     SignupResponse:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: User's UUID 32
 *         full_name:
 *           type: string
 *           description: User's full name
 *         username:
 *           type: string
 *           description: User's username
 *         email:
 *           type: string
 *           description: User's email
 *         birthdate:
 *           type: string
 *           description: User's birthdate
 *         password:
 *           type: string
 *           description: User's password
 *           minLength: 8
 *
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 */

// USERS
/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         admin:
 *           type: boolean
 *           description: Whether user has admin privileges
 *         premium:
 *           type: boolean
 *           description: Whether user has premium subscription
 *         username:
 *           type: string
 *           description: User's username
 *         full_name:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           description: User's email address
 *         uid:
 *           type: string
 *           description: User's unique identifier (UUID)
 *         image_url:
 *           type: string
 *           nullable: true
 *           description: URL to user's profile image
 *
 *     UserPublicProfile:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: User's username
 *         full_name:
 *           type: string
 *           description: User's full name
 *         uid:
 *           type: string
 *           description: User's unique identifier (UUID)
 *         image_url:
 *           type: string
 *           nullable: true
 *           description: URL to user's profile image
 *
 *     UserStats:
 *       type: object
 *       properties:
 *         stats:
 *           type: object
 *           properties:
 *             totalTastings:
 *               type: integer
 *               description: Total number of tastings by the user
 *             ratedTastings:
 *               type: integer
 *               description: Number of rated tastings by the user
 *             favoriteTastings:
 *               type: integer
 *               description: Number of favorite tastings by the user
 *
 *     UserProfileWithStats:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/UserProfile'
 *         stats:
 *           type: object
 *           properties:
 *             totalTastings:
 *               type: integer
 *               description: Total number of tastings by the user
 *             ratedTastings:
 *               type: integer
 *               description: Number of rated tastings by the user
 *             favoriteTastings:
 *               type: integer
 *               description: Number of favorite tastings by the user
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT token obtained from login endpoint
 */

// TASTINGS
/**
 * @swagger
 * components:
 *   schemas:
 *     TastingResponse:
 *       type: object
 *       properties:
 *         tid:
 *           type: string
 *           description: Unique tasting identifier (UUID)
 *         full_name:
 *           type: string
 *           description: Full name/title of the tasting
 *         wine_category:
 *           type: string
 *           description: Wine category name
 *         favorite:
 *           type: boolean
 *           description: Whether this tasting is marked as favorite
 *         sample_number:
 *           type: string
 *           description: Sample identification number
 *         wine_denomination:
 *           type: string
 *           description: Wine denomination (e.g., DOCG, DOC)
 *         winemaker:
 *           type: string
 *           description: Name of the winemaker/producer
 *         alcohol_content:
 *           type: number
 *           format: float
 *           description: Alcohol content percentage
 *         vintage:
 *           type: integer
 *           description: Vintage year
 *         wine_temperature:
 *           type: number
 *           format: float
 *           description: Wine serving temperature in Celsius
 *         ambient_temperature:
 *           type: number
 *           format: float
 *           description: Ambient room temperature in Celsius
 *         tasting_date:
 *           type: string
 *           format: date-time
 *           description: Date and time when tasting was performed (ISO 8601)
 *         tasting_location:
 *           type: string
 *           description: Location where tasting took place
 *         new:
 *           type: boolean
 *           description: Whether this uses the new tasting format
 *
 *     TastingsListResponse:
 *       type: object
 *       properties:
 *         tastings:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TastingResponse'
 *           description: Array of user's tastings sorted by date (newest first)
 *
 *     TastingCreateRequest:
 *       type: object
 *       required:
 *         - full_name
 *         - wine_category_name
 *         - favorite
 *         - sample_number
 *         - wine_denomination
 *         - winemaker
 *         - alcohol_content
 *         - vintage
 *         - wine_temperature
 *         - ambient_temperature
 *         - tasting_date
 *         - tasting_time
 *         - tasting_location
 *       properties:
 *         full_name:
 *           type: string
 *           description: Full name/title of the tasting
 *         wine_category_name:
 *           type: string
 *           description: Wine category code (e.g., 'red_wine', 'white_wine')
 *         favorite:
 *           type: boolean
 *           description: Whether to mark this tasting as favorite
 *         sample_number:
 *           type: string
 *           description: Sample identification number
 *         wine_denomination:
 *           type: string
 *           description: Wine denomination (e.g., DOCG, DOC)
 *         winemaker:
 *           type: string
 *           description: Name of the winemaker/producer
 *         alcohol_content:
 *           type: string
 *           description: Alcohol content percentage (will be converted to float)
 *         vintage:
 *           type: integer
 *           description: Vintage year (cannot be in the future)
 *         wine_temperature:
 *           type: string
 *           description: Wine serving temperature in Celsius (will be converted to float)
 *         ambient_temperature:
 *           type: string
 *           description: Ambient room temperature in Celsius (will be converted to float)
 *         tasting_date:
 *           type: string
 *           format: date
 *           description: Date when tasting was performed (YYYY-MM-DD format)
 *         tasting_time:
 *           type: string
 *           description: Time when tasting was performed (HH:MM format)
 *         tasting_location:
 *           type: string
 *           description: Location where tasting took place
 *         new:
 *           type: boolean
 *           description: Whether to use the new tasting format (optional, defaults to false)
 *
 *     TastingUpdateRequest:
 *       type: object
 *       properties:
 *         sample_number:
 *           type: string
 *           description: Sample identification number
 *         wine_denomination:
 *           type: string
 *           description: Wine denomination (e.g., DOCG, DOC)
 *         winemaker:
 *           type: string
 *           description: Name of the winemaker/producer
 *         alcohol_content:
 *           type: number
 *           format: float
 *           description: Alcohol content percentage
 *         vintage:
 *           type: integer
 *           description: Vintage year (cannot be in the future)
 *         wine_temperature:
 *           type: number
 *           format: float
 *           description: Wine serving temperature in Celsius
 *         ambient_temperature:
 *           type: number
 *           format: float
 *           description: Ambient room temperature in Celsius
 *         tasting_location:
 *           type: string
 *           description: Location where tasting took place
 *         wine_category_name:
 *           type: string
 *           description: Wine category code (e.g., 'red_wine', 'white_wine')
 *         tasting_date:
 *           type: string
 *           format: date
 *           description: Date when tasting was performed (YYYY-MM-DD format)
 *         tasting_time:
 *           type: string
 *           description: Time when tasting was performed (HH:MM format)
 *       description: All fields are optional. Only provided fields will be updated.
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: string
 *           description: Success message
 */

// WINES
/**
 * @swagger
 * components:
 *   schemas:
 *     WineResponse:
 *       type: object
 *       properties:
 *         wid:
 *           type: string
 *           description: Unique wine identifier (UUID)
 *         denomination:
 *           type: string
 *           description: Wine denomination (e.g., Chianti Classico DOCG, Barolo DOCG)
 *         winemaker:
 *           type: string
 *           description: Name of the winemaker/producer
 *         vintage:
 *           type: integer
 *           description: Vintage year of the wine
 *
 *     WinesListResponse:
 *       type: object
 *       properties:
 *         wines:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WineResponse'
 *           description: Array of user's wines in to-drink collection, ordered by ID (ascending)
 *
 *     WineCreateRequest:
 *       type: object
 *       required:
 *         - denomination
 *         - winemaker
 *         - vintage
 *       properties:
 *         denomination:
 *           type: string
 *           description: Wine denomination (e.g., Chianti Classico DOCG, Barolo DOCG)
 *           example: "Chianti Classico DOCG"
 *         winemaker:
 *           type: string
 *           description: Name of the winemaker/producer
 *           example: "Castello di Brolio"
 *         vintage:
 *           type: integer
 *           description: Vintage year of the wine
 *           example: 2019
 */

// COLLEAGUES
/**
 * @swagger
 * components:
 *   schemas:
 *     ColleagueProfile:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: User's unique identifier (UUID)
 *         username:
 *           type: string
 *           description: User's username
 *         full_name:
 *           type: string
 *           description: User's full name
 *         premium:
 *           type: boolean
 *           description: Whether user has premium subscription
 *         image_url:
 *           type: string
 *           nullable: true
 *           description: URL to user's profile image
 *
 *     ColleaguesListResponse:
 *       type: object
 *       properties:
 *         colleagues:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ColleagueProfile'
 *           description: Array of accepted colleagues, ordered by creation date (newest first)
 *
 *     ColleagueRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the requester/addressee
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: When the request was created (ISO 8601)
 *         rid:
 *           type: string
 *           description: Relationship ID (UUID)
 *         uid:
 *           type: string
 *           description: User ID of the requester/addressee
 *         image_url:
 *           type: string
 *           nullable: true
 *           description: URL to user's profile image
 *
 *     ColleagueRequestsResponse:
 *       type: object
 *       properties:
 *         incoming:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ColleagueRequest'
 *           description: Requests sent to the current user
 *         outgoing:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ColleagueRequest'
 *           description: Requests sent by the current user
 *
 *     BlockedUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the blocked user
 *         full_name:
 *           type: string
 *           description: Full name of the blocked user
 *         blocked_at:
 *           type: string
 *           format: date-time
 *           description: When the user was blocked (ISO 8601)
 *         rid:
 *           type: string
 *           description: Relationship ID (UUID) for unblocking
 *         uid:
 *           type: string
 *           description: User ID of the blocked user
 *         image_url:
 *           type: string
 *           nullable: true
 *           description: URL to user's profile image
 *
 *     BlockedUsersResponse:
 *       type: object
 *       properties:
 *         blocked:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BlockedUser'
 *           description: Array of blocked users, ordered by block date (newest first)
 *
 *     UserSearchResult:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: User's unique identifier (UUID)
 *         username:
 *           type: string
 *           description: User's username
 *         full_name:
 *           type: string
 *           description: User's full name
 *         image_url:
 *           type: string
 *           nullable: true
 *           description: URL to user's profile image
 *         status:
 *           type: string
 *           nullable: true
 *           enum: [null, "pending"]
 *           description: Current relationship status (null = no relationship, pending = outgoing request sent)
 *           example: null
 */

//
