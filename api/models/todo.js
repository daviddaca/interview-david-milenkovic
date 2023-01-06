const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  finished: {
    type: Boolean,
    required: true,
    default: false
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Todo', todoSchema)