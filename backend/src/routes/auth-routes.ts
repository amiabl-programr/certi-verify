import express from 'express'
import { login, register, verifyUser,forgotPassword,resetPassword } from '../controllers/auth'

const router = express.Router()


router.post('/register', register)
router.get('/verify-email', verifyUser)
router.post('/login', login)

export default router
