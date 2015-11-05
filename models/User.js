var mongoose = require('mongoose')
var Note = require('./Note')

var User = mongoose.Schema({
  username: {
    type: String,
    required: false
  }
})

User.plugin(require('passport-local-mongoose'))

User.methods.getNotes = function (callback) {
  return Note.find({
    user_id: this._id
  }, callback)
}
module.exports = mongoose.model('user', User)