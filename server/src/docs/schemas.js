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
