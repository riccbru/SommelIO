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
