import express from 'express'
import RegisterModel from '../../models/Register.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await RegisterModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Not registered' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' })
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1m' })
    const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH, { expiresIn: '5m' })

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('token', token, { httpOnly: true, secure: isProduction, sameSite: 'strict' })
    res.cookie('refreshToken', refreshToken, { maxAge: 300000, httpOnly: true, secure: isProduction, sameSite: 'strict' })

    res.status(200).json({ message: 'Success',token})
  } catch (error) {
    console.error('Login error:', error); // Log the error for server-side monitoring
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
})
export default router
