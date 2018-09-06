let router = require('express').Router()
let Tasks = require('../models/task')

//GET
router.get('tasks', (req, res, next) => {
  Tasks.find({ listId: req.params.listId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(400).send(err)
      next()
    })
})

//POST
router.post('/tasks', (req, res, next) => {
  Tasks.create(req.body)
    .then(newTask => {
      res.send(newTask)
    })
    .catch(err => {
      res.status(400).send(err)
      next()
    })
})

//DELETE
router.delete('/:taskId', (req, res, next) => {
  Tasks.findByIdAndRemove(req.params.taskId)
    .then(() => res.send({
      message: 'DELETED'
    }))
    .catch(err => {
      res.status(400).send(err)
      next()
    })
})


module.exports = router