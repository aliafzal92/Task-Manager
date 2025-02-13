import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("task", TaskSchema);

export { Task };
