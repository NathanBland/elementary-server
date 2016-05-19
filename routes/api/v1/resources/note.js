var express = require('express')
var router = module.exports = express.Router()
var Note = require('../../../../models/Note')

router.route('/') // this is /api/v1/content/note
    .get(function(req, res, next) {
        req.user.getNotes()
          .sort('-updated')
          .exec()
          .then(
              notes => res.status(200).json({data :notes}),
              err => res.status(400).json({'error': 'Internal Server Error', err })
           );
    })
    .post(function(req, res, next) {
        var alias = req.user.username + '-' + new Date().toISOString()
        new Note({
            title: req.body.title || 'Note on ' + new Date(),
            content: req.body.content,
            alias: alias,
            user_id: req.user._id
        })
        .save()
        .then(
            note => res.status(201).json(note),
            err => res.status(400).json({ 'error': 'Internal Server Error', err })
        );
        
    })
    
router.route('/:alias')
    .get(function(req, res, next) {
        Note.findOne({
            alias: req.params.alias,
            user_id: req.user._id
        })
        .sort('-_id')
        .then(
            note => res.status(200).json(note),
            err => res.status(400).json({ 'error': 'Internal Server Error', err })
        );
    })
    .put(function(req, res, next) {
        var query = { alias: req.params.alias, user_id: req.user.user._id }
        var obj = {updated: new Date()}
        if (req.body.title) 
          obj.title = req.body.title
          
        if (req.body.content)
          obj.content = req.body.content
        
        Note
          .findOneAndUpdate(query, obj)
          .exec()
          .then(
            note => res.status(200).json(note),
            err => res.status(400).json({ 'error': 'Internal Server Error', err })
          );
    })
    .delete(function(req, res, next) {
        Note
          .findOneAndRemove({
              alias: req.params.alias, 
              user_id: req.user._id
          })
          .exec()
          .then(
            note => res.status(204).json(note),
            err => res.status(500).json({ 'error': 'Internal Server Error', err })
          );
    })