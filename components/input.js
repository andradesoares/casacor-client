import React from 'react';

import classes from './input.module.scss';

const Input = ({ onChange, label, style, type, placeholder, value }) => {
  return style == 'inline' ? (
    <>
      <div className={classes.inline}>
        <label htmlFor="inputName">{label}</label>
        <div className={classes.containerInput}>
          <input
            placeholder={placeholder}
            type={type}
            value={value}
            name="inputName"
            onChange={onChange}
          />
        </div>
      </div>
    </>
  ) : (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0' }}>
        <label htmlFor="inputName">{label}</label>
        <input
          placeholder={placeholder}
          type={type}
          value={value}
          name="inputName"
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default Input;
