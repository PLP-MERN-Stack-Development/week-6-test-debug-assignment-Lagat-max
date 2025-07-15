import React, { useState } from 'react';

function BugItem({ bug, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...bug });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = e => {
    e.preventDefault();
    onUpdate(bug._id, form);
    setEditing(false);
  };

  return (
    <li className={`bug-item status-${bug.status}`}>
      {editing ? (
        <form onSubmit={handleUpdate} className="edit-form">
          <input name="title" value={form.title} onChange={handleChange} required />
          <textarea name="description" value={form.description} onChange={handleChange} required />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h3>{bug.title}</h3>
          <p>{bug.description}</p>
          <div>Status: {bug.status}</div>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onDelete(bug._id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default BugItem; 