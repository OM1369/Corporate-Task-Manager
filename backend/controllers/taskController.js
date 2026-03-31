const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, assignedBy: req.user.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getEmployerTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedBy: req.user.userId }).populate("assignedTo", "name username");
    res.json(tasks);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getEmployeeTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.userId }).populate("assignedBy", "name");
    res.json(tasks);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role === "employer") {
      if (task.assignedBy.toString() !== req.user.userId) {
        return res.status(403).json({ message: "Forbidden: You didn't assign this task." });
      }
      Object.assign(task, req.body); 
    } else {
      if (task.assignedTo.toString() !== req.user.userId) {
        return res.status(403).json({ message: "Forbidden: Task not assigned to you." });
      }
      task.status = req.body.status; 
    }
    
    await task.save();
    res.json(task);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.assignedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden: You can only delete tasks you assigned." });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) { res.status(500).json({ error: error.message }); }
};