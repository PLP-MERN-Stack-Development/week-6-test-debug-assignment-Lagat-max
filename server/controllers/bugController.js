const Bug = require('../models/Bug');
const validateBug = require('../helpers/validateBug');

// Get all bugs
exports.getBugs = async (req, res, next) => {
  try {
    console.log('Fetching all bugs'); // Debugging example
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (err) {
    next(err);
  }
};

// Get a single bug by ID
exports.getBug = async (req, res, next) => {
  try {
    console.log('Fetching bug with ID:', req.params.id); // Debugging example
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json(bug);
  } catch (err) {
    next(err);
  }
};

// Create a new bug
exports.createBug = async (req, res, next) => {
  const { isValid, errors } = validateBug(req.body);
  if (!isValid) return res.status(400).json({ errors });
  try {
    console.log('Creating bug:', req.body); // Debugging example
    const bug = new Bug(req.body);
    await bug.save();
    res.status(201).json(bug);
  } catch (err) {
    next(err);
  }
};

// Update a bug
exports.updateBug = async (req, res, next) => {
  const { isValid, errors } = validateBug(req.body);
  if (!isValid) return res.status(400).json({ errors });
  try {
    console.log('Updating bug ID:', req.params.id, 'with:', req.body); // Debugging example
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json(bug);
  } catch (err) {
    next(err);
  }
};

// Delete a bug
exports.deleteBug = async (req, res, next) => {
  try {
    console.log('Deleting bug ID:', req.params.id); // Debugging example
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json({ message: 'Bug deleted' });
  } catch (err) {
    next(err);
  }
}; 