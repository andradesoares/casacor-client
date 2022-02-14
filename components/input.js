import React from 'react';

import classes from './input.module.scss';

const Input = ({ onChange, label, style, type, placeholder, value }) => {
  return style == 'inline' ? (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', padding: '0', alignItems: 'center' }}>
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
      <label htmlFor="inputName">{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        name="inputName"
        onChange={onChange}
      />
    </>
  );
};

export default Input;
