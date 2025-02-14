import { Task } from "../models/task.model.js";
import mongoose from "mongoose";
import asyncWrapper from "../middlewares/async.js";
import { createCustomError } from "../errors/custom-error.js";

// get all tasks
export const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// create a task
export const createTask = asyncWrapper(async (req, res, next) => {
  try {
    console.log("Request body:", req.body); // Add this line to log the request body
    const task = await Task.create(req.body);
    console.log("Task created:", task);

    res.status(201).json({
      task,
    });
  } catch (error) {
    next(createCustomError(500, "Error creating task"));
  }
});

// get a task
export const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createCustomError(400, "Invalid id"));
  }

  const task = await Task.findById(id);
  if (!task) {
    return next(createCustomError(404, "Task not found"));
  }
  console.log("Task found:", task);

  res.status(200).json({ task });
});

// delete a task
export const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return next(createCustomError(404, `No task found with id ${id}`));
  }
  res.status(200).json({ task });
});

// update a task
export const updateTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createCustomError(400, "Invalid id"));
  }

  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(404, "Task not found"));
  }

  res.status(200).json({
    task,
  });
});
