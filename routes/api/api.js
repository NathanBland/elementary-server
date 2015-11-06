var express = require('express')

var router = module.exports = express.Router()

router.use('/v1', require('./v1/v1'))