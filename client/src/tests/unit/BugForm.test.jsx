import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BugForm from '../../components/BugForm';

describe('BugForm', () => {
  it('renders form fields', () => {
    render(<BugForm onSubmit={jest.fn()} />);
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /report bug/i })).toBeInTheDocument();
  });

  it('shows error if required fields are missing', () => {
    render(<BugForm onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /report bug/i }));
    expect(screen.getByText(/title and description are required/i)).toBeInTheDocument();
  });

  it('calls onSubmit with form data', () => {
    const handleSubmit = jest.fn();
    render(<BugForm onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByPlaceholderText(/title/i), { target: { value: 'Bug' } });
    fireEvent.change(screen.getByPlaceholderText(/description/i), { target: { value: 'Desc' } });
    fireEvent.click(screen.getByRole('button', { name: /report bug/i }));
    expect(handleSubmit).toHaveBeenCalledWith({ title: 'Bug', description: 'Desc', status: 'open' });
  });
}); 