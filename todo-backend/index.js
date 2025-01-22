const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models/");
const authController = require('./controllers/auth'); 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());


function success(res, payload) {
  return res.status(200).json(payload);
}


app.get("/todos", async (req, res, next) => {
  try {
    const todos = await db.Todo.find({});
    return success(res, todos);
  } catch (err) {
    next({ status: 400, message: "Failed to get todos" });
  }
});


app.post("/todos", async (req, res, next) => {
  try {
    const todo = await db.Todo.create(req.body);
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "Failed to create todo" });
  }
});


app.put("/todos/:id", async (req, res, next) => {
  try {
    const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true 
    });
    if (!todo) {
      return next({ status: 404, message: "Todo not found" });
    }
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "Failed to update todo" });
  }
});


app.delete("/todos/:id", async (req, res, next) => {
  try {
    const todo = await db.Todo.findByIdAndRemove(req.params.id);
    if (!todo) {
      return next({ status: 404, message: "Todo not found" });
    }
    return success(res, "Todo deleted!");
  } catch (err) {
    next({ status: 400, message: "Failed to delete todo" });
  }
});


app.use('/auth', authController); 


app.use((err, req, res, next) => {
  console.error(err);
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "There was an error processing the request"
  });
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});