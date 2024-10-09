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
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})
export default router
