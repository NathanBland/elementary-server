var express = require('express')
var router = module.exports = express.Router()

var passport = require('passport')
var User = require('../../../../models/User')

router.use('/', passport.authenticate('bearer', {
    session: false
}))


router.use('/note', require('./note'))

