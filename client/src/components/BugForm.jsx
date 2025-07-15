import React, { useState } from 'react';

const initialState = { title: '', description: '', status: 'open' };

function BugForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.description) {
      setError('Title and description are required.');
      return;
    }
    setError(null);
    onSubmit(form);
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="bug-form">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
      <button type="submit">Report Bug</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default BugForm; 