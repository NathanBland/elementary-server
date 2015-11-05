var express = require('express')
var router = module.exports = express.Router()

var Auth = require('./authentication')
var resources = require('./resources')

router.use('/auth', Auth)
router.use('/content', resources)

router.route('/')
    .get(function(req, res, next) {
        return res.status(200).json({
            'message': 'Welcome to the API'
        })
    })
