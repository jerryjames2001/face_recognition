import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const RegisterSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  username: String,
  email: String,
  password: String,
  access: { type: Boolean, default: false }, // Add access field with default value false
  name: { type: String, select: false } // Include name field for input purposes
}, {
  versionKey: false, // Disable the __v field
  collection: 'register' // collection register

})

// Pre-save hook to hash the password
RegisterSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
      next()
    } catch (err) {
      next(err)
    }
  }
  if (this.isModified('name') || this.isNew) {
    const [fname, lname] = this.name.split(' ')
    this.fname = fname
    this.lname = lname
  }
  next()
})

const RegisterModel = mongoose.model('register', RegisterSchema)
export default RegisterModel
