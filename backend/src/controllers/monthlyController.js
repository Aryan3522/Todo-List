const MonthlyTask = require("../models/MonthlyTask");

// GET all (group by month)
exports.getPlans = async (req, res) => {
  const tasks = await MonthlyTask.find();

  const grouped = {};

  tasks.forEach((task) => {
    if (!grouped[task.month]) grouped[task.month] = [];
    grouped[task.month].push(task);
  });

  res.json(grouped);
};

// ADD PLAN
exports.addPlan = async (req, res) => {
  const { title, month } = req.body;

  const task = await MonthlyTask.create({
    title,
    month,
  });

  res.status(201).json(task);
};

// DELETE
exports.deletePlan = async (req, res) => {
  await MonthlyTask.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// SET IN PROGRESS
exports.setProgress = async (req, res) => {
  const task = await MonthlyTask.findByIdAndUpdate(
    req.params.id,
    { inProgress: true, completed: false },
    { new: true }
  );

  res.json(task);
};

// MOVE BACK TO TODO
exports.moveToTodo = async (req, res) => {
  const task = await MonthlyTask.findByIdAndUpdate(
    req.params.id,
    { inProgress: false, completed: false },
    { new: true }
  );

  res.json(task);
};

// COMPLETE
exports.completeTask = async (req, res) => {
  const task = await MonthlyTask.findByIdAndUpdate(
    req.params.id,
    { completed: true, inProgress: false },
    { new: true }
  );

  res.json(task);
};