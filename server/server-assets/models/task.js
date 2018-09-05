let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  created: { type: Number, default: Date.now() },
  listId: { type: ObjectId, ref: "List", required: true }
});

module.exports = mongoose.model("Task", schema);
