import React from 'react';

function Button({ children, onClick, disabled, className = '', ...props }) {
  return (
    <button
      className={`btn-primary ${disabled ? 'btn-disabled' : ''} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button; 