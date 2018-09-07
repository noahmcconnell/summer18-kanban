let router = require('express').Router()
let Comments = require('../models/comment')

//GET
router.get('/:taskId', (req, res, next) => {
  Comments.find({ taskId: req.params.taskId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(400).send(err)
      next()
    })
})

//POST
router.post('/', (req, res, next) => {
  Comments.create(req.body)
    .then(newComment => {
      res.send(newComment)
    })
    .catch(err => {
      res.status(400).send(err)
      next()
    })
})

//DELETE
router.delete('/:commentId', (req, res, next) => {
  Comments.findByIdAndRemove(req.params.commentId)
    .then(() => res.send ({
      message: 'DELETED'
    }))
    .catch(err => {
      res.status(400).send(err)
      next()
    })
})


module.exports = router