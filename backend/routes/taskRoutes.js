const express = require("express");
const { createTask, getEmployerTasks, getEmployeeTasks, updateTask, deleteTask } = require("../controllers/taskController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const { validateCreateTask, validateUpdateTask } = require("../middleware/validationMiddleware");
const router = express.Router();

router.use(verifyToken);
router.post("/", authorizeRoles("employer"), validateCreateTask, createTask);
router.get("/employer", authorizeRoles("employer"), getEmployerTasks);
router.get("/employee", authorizeRoles("employee"), getEmployeeTasks);
router.put("/:id", validateUpdateTask, updateTask); 
router.delete("/:id", authorizeRoles("employer"), deleteTask);

module.exports = router;