const mongoose = require('mongoose')
const logger = require('../utils/logger')

mongoose.set('useFindAndModify', false)

// const url = process.env.MONGODB_URI

// logger.info('connecting to', url)

// mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
//   .then(result => {
//     logger.info('connected to MongoDB')
//   })
//   .catch((error) => {
//     logger.info('error connecting to MongoDB:', error.message)
//   })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  date: { 
    type: Date,
    required: true
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)