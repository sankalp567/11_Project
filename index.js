require("dotenv").config();
// require('dotenv').config({ path: 'ENV_FILENAME' });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// let posts = [];
mongoose.set('strictQuery', false);
// mongoose.connect("mongodb://127.0.0.1:27017/BlogDB",{useNewUrlParser : true});
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
const Item =require("./models/schema")

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/achivement", function(req, res){
  res.sendFile(__dirname+"/achivement.html");
});

app.post("/", function(req, res){
  const item = new Item( {
    Name :req.body.name,
    Email :req.body.email,
    Comment : req.body.comment
  });

  item.save();

  res.redirect("/");

});

connectDB().then(() => {
    app.listen(process.env.PORT|| 3000, () => {
        console.log("listening for requests");
    })
  })
  