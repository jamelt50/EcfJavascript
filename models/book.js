const mongoose = require("mongoose");
const booksySchema = new mongoose.Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model("booksy", booksySchema);
