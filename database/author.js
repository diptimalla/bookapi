const mongoose = require("mongoose");

//creating author schema
const AuthorSchema= mongoose.Schema({
      id: Number,
      name:String,
      books: [String],

});

//create author model
const AuthorModel = mongoose.model("authors",AuthorSchema);
module.exports = AuthorModel;


