const mongoose = require("mongoose");

const monthlyTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    month: {
      type: Number,
      required: true,
      min: 0,
      max: 11,
    },
    inProgress: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MonthlyTask", monthlyTaskSchema);