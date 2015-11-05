var express = require('express')

var router = module.exports = express.Router()

var api = require('./api/v1/api')

router.use('/api/v1', api)

router.get('/', function(req, res, next) {
    return res.status(200).json({
        'message': 'Hello World!'
    })
})