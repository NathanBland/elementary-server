var express = require('express')

var router = module.exports = express.Router()

router.use('/api', require('./api/api')) // root/api

router.get('/', function(req, res, next) {
    return res.status(200).json({
        'message': 'Hello World!'
    })
})