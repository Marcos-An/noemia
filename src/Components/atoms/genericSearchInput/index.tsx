import React from 'react';
import styles from './genericSearchInput.module.scss'


export default function GenericSearchInput({ type = "text",  value = '', setValue,}) {

  const changeValue = (e) => {
    const { target: { value } } = e

    setValue(value);
  }

  return (
    <div className={value ? styles.input : styles.inputEmpety}>
      <input
        id='search'
        type={type}
        
        autoComplete="off"
        value={value}
        onChange={(e) => changeValue(e)}
      />
    </div>
  )
}