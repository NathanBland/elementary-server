var express = require('express')
var router = module.exports = express.Router()

var local = require('./local.js')
router.use('/local', local)

router.route('/')
    .get(function(req, res, next) {
        return res.status(200).json({
            'message': 'Auth API'
        })
    })