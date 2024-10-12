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
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '2m' })
    //const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH, { expiresIn: '5m' })

    //const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' })
    //res.cookie('refreshToken', refreshToken, { maxAge: 300000, httpOnly: true, secure: isProduction, sameSite: 'strict' })

    res.status(200).json({ message: 'Success',token})
  } catch (error) {
    console.error('Login error:', error); // Log the error for server-side monitoring
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
})

router.get('/profile', async (req, res) => {
  const token = req.cookies.token; // Access token from cookies
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await RegisterModel.findOne({ email }); // Fetch user details
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user); // Send user details as response
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error. Try again.' });
  }
});

export default router
