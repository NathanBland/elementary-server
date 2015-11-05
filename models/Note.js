var mongoose = require('mongoose')

var Note = mongoose.Schema({
  title: String,
  content: String,
  alias: String,
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    index: true
  }
})

module.exports = mongoose.model('note', Note)