import express from 'express'
import { Google, Login, SignUp, signOut } from '../Controllers/authController.js';
const router = express.Router()

router.route('/signup').post(SignUp)
router.route('/login').post(Login)
router.route('/google').post(Google)
router.route('/signout').get(signOut)

export default router;