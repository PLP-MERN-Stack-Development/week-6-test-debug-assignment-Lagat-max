function validateBug(data) {
  const errors = {};
  if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
    errors.title = 'Title is required.';
  }
  if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
    errors.description = 'Description is required.';
  }
  if (data.status && !['open', 'in-progress', 'resolved'].includes(data.status)) {
    errors.status = 'Invalid status.';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = validateBug; 