import express from 'express'
import RegisterModel from '../../models/Register.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body
  RegisterModel.findOne({ email })
    .then(user => {
      if (user) {
        res.json('Already have an account')
      } else {
        RegisterModel.create({ name, username, email, password })
          .then(result => res.json('Account created'))
          .catch(error => console.error('Error creating account', error))
      }
    }).catch(error => console.error('Error finding user', error))
})

export default router
