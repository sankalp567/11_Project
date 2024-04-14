const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    Name:String,
    Email:String,
    Comment:String
  });
  
module.exports= mongoose.model("inquiry",postSchema);