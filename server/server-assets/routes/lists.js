let router = require('express').Router()
let Lists = require('../models/list')

//GET
router.get('/:boardId', (req, res, next) => {
  Lists.find({ boardId: req.params.boardId })
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
  Lists.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      res.status(400).send(err)
      next()
    })
})

//DELETE
router.delete('/:listId', (req, res, next) => {
  Lists.findByIdAndRemove(req.params.listId)
    .then(() => res.send ({
      message: 'DELETED'
    }))
    .catch(err => {
      res.status(400).send(err)
      next()
    })
})


module.exports = router