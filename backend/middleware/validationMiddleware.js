const { body, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

exports.validateRegister = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("username").trim().notEmpty().isAlphanumeric().withMessage("Alphanumeric username required"),
  body("password").isLength({ min: 6 }).withMessage("Password: min 6 chars"),
  body("role").isIn(["employer", "employee"]).withMessage("Invalid role"),
  handleValidationErrors,
];

exports.validateLogin = [
  body("username").notEmpty().withMessage("Username required"),
  body("password").notEmpty().withMessage("Password required"),
  body("role").isIn(["employer", "employee"]).withMessage("Role required"),
  handleValidationErrors,
];

exports.validateCreateTask = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("assignedTo").isMongoId().withMessage("Invalid employee ID"),
  body("deadline").isISO8601().toDate().withMessage("Invalid date format"),
  handleValidationErrors,
];

exports.validateUpdateTask = [
  body("status").optional().isIn(["Pending", "In-Progress", "Done"]),
  body("title").optional().trim().notEmpty(),
  body("assignedTo").optional().isMongoId(),
  body("deadline").optional().isISO8601().toDate(),
  handleValidationErrors,
];