const mongoose = require('mongoose')

const entrySchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, 'You must provide body'],
  },
  author: String,
}, {
  timestamps: true,
})

module.exports = mongoose.model('Entry', entrySchema)