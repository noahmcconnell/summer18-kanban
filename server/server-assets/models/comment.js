let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

var schema = new mongoose.Schema({
    boardId: { type: ObjectId, ref: models.board, required: true },
    listId: { type: ObjectId, ref: models.list, required: true },
    taskId: { type: ObjectId, ref: models.task, required: true },
    created: { type: Number, default: Date.now() },
    comment: { type: String, required: true },
});

module.exports = mongoose.model(models.comment.name, schema);