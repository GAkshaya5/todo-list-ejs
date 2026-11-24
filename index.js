const express = require("express");
const methodOverride = require("method-override");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // lets HTML forms send PUT and DELETE
app.use(express.static(path.join(__dirname, "public")));

// array is our "database", it resets when the server restarts
let todos = [
  { id: 1, text: "Finish MERN assignment 7", priority: "High" },
  { id: 2, text: "Push the code to GitHub", priority: "Medium" },
  { id: 3, text: "Revise Express routing", priority: "Low" },
];
let nextId = 4;

const priorities = ["High", "Medium", "Low"];

// show all todos (optionally filtered by priority)
app.get("/", (req, res) => {
  const selected = priorities.includes(req.query.priority)
    ? req.query.priority
    : "All";

  const shown =
    selected === "All" ? todos : todos.filter((t) => t.priority === selected);

  res.render("index", {
    todos: shown,
    total: todos.length,
    selected,
    priorities,
    error: req.query.error || null,
  });
});

// add a new todo
app.post("/todos", (req, res) => {
  const text = (req.body.text || "").trim();
  const priority = priorities.includes(req.body.priority)
    ? req.body.priority
    : "Medium";

  if (!text) {
    return res.redirect("/?error=empty");
  }

  todos.push({ id: nextId++, text, priority });
  res.redirect("/");
});

// open the edit page for one todo
app.get("/todos/:id/edit", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) {
    return res.status(404).render("notfound");
  }
  res.render("edit", { todo, priorities, error: req.query.error || null });
});

// update a todo
app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) {
    return res.status(404).render("notfound");
  }

  const text = (req.body.text || "").trim();
  if (!text) {
    return res.redirect(`/todos/${todo.id}/edit?error=empty`);
  }

  todo.text = text;
  if (priorities.includes(req.body.priority)) {
    todo.priority = req.body.priority;
  }
  res.redirect("/");
});

// delete a todo
app.delete("/todos/:id", (req, res) => {
  todos = todos.filter((t) => t.id !== Number(req.params.id));
  res.redirect("/");
});

// anything else
app.use((req, res) => {
  res.status(404).render("notfound");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
