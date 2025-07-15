const validateBug = require('../../helpers/validateBug');

describe('validateBug', () => {
  it('should return valid for correct data', () => {
    const data = { title: 'Bug 1', description: 'A bug', status: 'open' };
    const result = validateBug(data);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('should require title', () => {
    const data = { description: 'A bug', status: 'open' };
    const result = validateBug(data);
    expect(result.isValid).toBe(false);
    expect(result.errors.title).toBe('Title is required.');
  });

  it('should require description', () => {
    const data = { title: 'Bug 1', status: 'open' };
    const result = validateBug(data);
    expect(result.isValid).toBe(false);
    expect(result.errors.description).toBe('Description is required.');
  });

  it('should reject invalid status', () => {
    const data = { title: 'Bug 1', description: 'A bug', status: 'invalid' };
    const result = validateBug(data);
    expect(result.isValid).toBe(false);
    expect(result.errors.status).toBe('Invalid status.');
  });
}); 