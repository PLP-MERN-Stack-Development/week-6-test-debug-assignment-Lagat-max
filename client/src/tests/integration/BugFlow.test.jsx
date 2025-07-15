import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';

jest.mock('../../api/bugApi', () => ({
  fetchBugs: jest.fn().mockResolvedValue([]),
  createBug: jest.fn().mockResolvedValue({}),
  updateBug: jest.fn().mockResolvedValue({}),
  deleteBug: jest.fn().mockResolvedValue({}),
}));

const { fetchBugs, createBug } = require('../../api/bugApi');

describe('Bug Tracker Integration', () => {
  beforeEach(() => {
    fetchBugs.mockResolvedValue([]);
  });

  it('renders empty bug list', async () => {
    render(<App />);
    expect(await screen.findByText(/no bugs reported/i)).toBeInTheDocument();
  });

  it('can add a bug', async () => {
    fetchBugs.mockResolvedValueOnce([]).mockResolvedValueOnce([
      { _id: '1', title: 'Bug', description: 'Desc', status: 'open' },
    ]);
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/title/i), { target: { value: 'Bug' } });
    fireEvent.change(screen.getByPlaceholderText(/description/i), { target: { value: 'Desc' } });
    fireEvent.click(screen.getByRole('button', { name: /report bug/i }));
    expect(await screen.findByText(/bug/i)).toBeInTheDocument();
  });

  it('shows error on API failure', async () => {
    fetchBugs.mockRejectedValueOnce(new Error('API error'));
    render(<App />);
    expect(await screen.findByText(/api error/i)).toBeInTheDocument();
  });
}); 