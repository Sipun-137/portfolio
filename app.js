const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port=process.env.PORT||3000

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", true);
mongoose
  .connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster1.xm25lga.mongodb.net/ContactDB`)
  .then(() => console.log("connected"));

const ContactDetailSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  name: String,
  message: String,
  phoneno: Number,
});

const Message = new mongoose.model("Message", ContactDetailSchema);

app.get("/", (req, res) => {
  res.render("profile");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/project", (req, res) => {
  res.render("project");
});
app.post("/thanks", (req, res) => {
  let tempmail = req.body.email;

  const newMsg = new Message({
    email: req.body.email,
    name: req.body.name,
    message: req.body.message,
    phoneno: req.body.phoneno,
  });

  newMsg.save().then(()=>{
    console.log("data saved successfully");
    res.render("thanks");
  });
});
//testing purpose
app.get("/404", (req, res) => {
  res.render("404");
});

app.listen(port, function (req, res) {
  console.log(`the sever started on ${port}`);
});
