var express = require('express')
var router = module.exports = express.Router()
var Note = require('../../../../models/Note')

router.route('/') // this is /api/v1/note
    .get(function(req, res, next) {
        req.user.getNotes()
            .sort('updated')
            .exec(function(err, notes) {
                if (err) {
                    return res.status(400).json({
                        'error': 'Internal Server Error'
                    })
                }
                return res.status(200).json(notes)
            })
    })
    .post(function(req, res, next) {
        var note = new Note()
        var alias = req.user.username + '-' + new Date().toISOString()
        note.set({
            title: req.body.title || 'Note on ' + new Date(),
            content: req.body.content,
            alias: alias,
            user_id: req.user.user._id
        })
        note.save(function(err) {
            if (err) {
                return res.status(400).json({
                    'error': 'Internal Server Error'
                })
            }
            else {
                return res.status(201).json(note)
            }
        })
    })
    
router.route('/:alias')
    .get(function(req, res, next) {
        Note.findOne({
                alias: req.params.alias,
                user_id: req.user.user._id
            },
            '-_id',
            function(err, note) {
                if (err) {
                    return res.status(500).json({
                        'error': 'Internal Server error'
                    })
                }
                return res.status(200).json(note)
            })
    })
    .put(function(req, res, next) {
        var query = { alias: req.params.alias, user_id: req.user.user._id }
        var obj = {updated: new Date()}
        if (req.body.title) {
          obj.title = req.body.title
        }
        if (req.body.content) {
          obj.content = req.body.content
        }
        Note.findOneAndUpdate(query, obj,
         function (err, note) {
           if (err) {
             return res.status(500).json({
               'error': 'Internal Server error'
             })
           }
           return res.status(200).json(note)
         })
    })
    .delete(function(req, res, next) {
        Note.findOneAndRemove({alias: req.params.alias, user_id: req.user.user_id},
          function (err, result) {
            if (err) {
              return res.status(500).json({
                'error': 'Internal Server error'
              })
            }
            return res.status(204).json(result)
          })
    })