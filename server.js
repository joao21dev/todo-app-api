const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://pedro:1542653a@merntodo.wogwo.mongodb.net/Todo?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    //create new Todo inside Todo collection
    text: req.body.text, //store what we parse through our req
  });

  todo.save(); //save inside collection

  res.json(todo); //parses back the todo we added
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id); //delete the todo by his unique Id

  res.json(result); //parses back the todo we deleted
});

app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete; //if complete = false, turns to true

  todo.save();

  res.json(todo);
});

app.listen(process.env.PORT || 3001, () => console.log("Server listening on port 30001"));
