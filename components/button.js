import React from 'react';

import classes from './button.module.scss';

const Button = ({ disabled, onClick, label }) => {
  return (
    <button
      className={`${classes.button} ${disabled ? classes.buttonDisabled : classes.buttonEnabled}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
