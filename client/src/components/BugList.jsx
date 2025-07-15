import React from 'react';
import BugItem from './BugItem';

function BugList({ bugs, onUpdate, onDelete }) {
  if (!bugs.length) return <div>No bugs reported.</div>;
  return (
    <ul className="bug-list">
      {bugs.map(bug => (
        <BugItem key={bug._id} bug={bug} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default BugList; 