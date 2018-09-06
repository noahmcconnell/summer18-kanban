let router = require('express').Router()
let Comments = require('../models/comment')

//GET
router.get('comments', (req, res, next) => {
  Comments.find({ taskId: req.params.taskId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST
router.post('/comments', (req, res, next) => {
  Comments.create(req.body)
    .then(newComment => {
      res.send(newComment)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//DELETE
router.delete('/comments/:commentId', (req, res, next) => {
  Comments.findByIdAndRemove(req.params.commentId)
    .then(() => res.send ({
      message: 'DELETED'
    }))
    .catch(err => {
      console.log(err)
      next()
    })
})


module.exports = router