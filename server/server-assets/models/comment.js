let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

var schema = new mongoose.Schema({
  taskId: { type: ObjectId, ref: "Task", required: true },
  comment: { type: String, required: true },
  created: { type: Number, default: Date.now() }
});

module.exports = mongoose.model("Comment", schema);
