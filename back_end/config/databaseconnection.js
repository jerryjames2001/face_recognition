import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('mongodb connected')
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
