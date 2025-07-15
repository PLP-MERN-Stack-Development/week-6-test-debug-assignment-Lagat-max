import React, { useEffect, useState } from 'react';
import { fetchBugs, createBug, updateBug, deleteBug } from './api/bugApi';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBugs = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Loading bugs from API...'); // Debugging example
      const data = await fetchBugs();
      setBugs(data);
      console.log('Loaded bugs:', data); // Debugging example
    } catch (err) {
      setError(err.message);
      console.error('Error loading bugs:', err); // Debugging example
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBugs();
  }, []);

  const handleCreate = async (bug) => {
    try {
      console.log('Creating bug:', bug); // Debugging example
      await createBug(bug);
      loadBugs();
    } catch (err) {
      setError(err.message);
      console.error('Error creating bug:', err); // Debugging example
    }
  };

  const handleUpdate = async (id, bug) => {
    try {
      console.log('Updating bug:', id, bug); // Debugging example
      await updateBug(id, bug);
      loadBugs();
    } catch (err) {
      setError(err.message);
      console.error('Error updating bug:', err); // Debugging example
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log('Deleting bug:', id); // Debugging example
      await deleteBug(id);
      loadBugs();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting bug:', err); // Debugging example
    }
  };

  return (
    <ErrorBoundary>
      <div className="container">
        <h1>Bug Tracker</h1>
        <BugForm onSubmit={handleCreate} />
        {error && <div className="error">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <BugList bugs={bugs} onUpdate={handleUpdate} onDelete={handleDelete} />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App; 