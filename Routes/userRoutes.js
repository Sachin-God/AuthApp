import express from 'express'
import { userUpdate } from '../Controllers/userController.js';
import { verifyToken } from '../utils/authMiddleware.js';
const router = express.Router()

router.post('/update/:id', verifyToken, userUpdate);

export default router;