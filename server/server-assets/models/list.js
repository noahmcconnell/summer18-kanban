let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	created: { type: Number, default: Date.now() },
	boardId: { type: ObjectId, ref: models.board, required: true }
});

module.exports = mongoose.model(models.list.name, schema);