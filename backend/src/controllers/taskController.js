const Task = require("../models/Task");

// GET all tasks grouped like frontend
exports.getTasks = async (req, res) => {
  const tasks = await Task.find();

  const grouped = {
    today: [],
    tomorrow: [],
    previous: [],
  };

  tasks.forEach((task) => {
    grouped[task.category].push(task);
  });

  res.json(grouped);
};

// ADD task
exports.createTask = async (req, res) => {
  const { title, category } = req.body;

  const date = new Date();

  if (category === "tomorrow") {
    date.setDate(date.getDate() + 1);
  }

  if (category === "previous") {
    date.setDate(date.getDate() - 1);
  }

  const task = await Task.create({
    title,
    category,
    date,
  });

  res.status(201).json(task);
};

// MOVE task
exports.moveTask = async (req, res) => {
  const { category } = req.body;

  const date = new Date();

  if (category === "tomorrow") {
    date.setDate(date.getDate() + 1);
  }

  if (category === "previous") {
    date.setDate(date.getDate() - 1);
  }

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { category, date },
    { new: true }
  );

  res.json(task);
};

// COMPLETE task
exports.completeTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    { new: true }
  );

  res.json(task);
};

// DELETE
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};