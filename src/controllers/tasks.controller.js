import { Task } from "../models/task.model.js";
import mongoose from "mongoose";

// get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

// create a task
export const createTask = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Add this line to log the request body
    const task = await Task.create(req.body);
    console.log("Task created:", task);

    res.status(201).json({
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error); // Add this line to log the error
    res.status(500).json({
      msg: error,
    });
  }
};

// get a task
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Task ID" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    console.log("Task found:", task);

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id });

    if (!task) {
      return res.status(404).json({
        msg: `No task found with id ${id}`,
      });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(200).json({
      task,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
