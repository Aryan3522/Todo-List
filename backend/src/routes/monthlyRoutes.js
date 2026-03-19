const express = require("express");
const router = express.Router();

const {
  getPlans,
  addPlan,
  deletePlan,
  setProgress,
  moveToTodo,
  completeTask,
} = require("../controllers/monthlyController");

router.get("/", getPlans);
router.post("/", addPlan);
router.delete("/:id", deletePlan);

router.patch("/:id/progress", setProgress);
router.patch("/:id/todo", moveToTodo);
router.patch("/:id/complete", completeTask);

module.exports = router;