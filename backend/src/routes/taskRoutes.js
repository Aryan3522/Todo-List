const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  moveTask,
  deleteTask,
  completeTask,
} = require("../controllers/taskController");

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id/move", moveTask);
router.patch("/:id/complete", completeTask);
router.delete("/:id", deleteTask);

module.exports = router;