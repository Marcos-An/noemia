import React from 'react';
import styles from './genericInput.module.scss'
import GenericText from '../genericText'


export default function GenericInput({ type = "text", label, value = '', setValue, id = "" }) {

  const changeValue = (e) => {
    const { target: { value } } = e

    setValue(value);
  }

  return (
    <div className={value ? styles.input : styles.inputEmpety}>
      <input
        id={id}
        type={type}
        autoComplete="off"
        value={value}
        onChange={(e) => changeValue(e)}
      />
      <label>
        <GenericText>
          {label}
        </GenericText>
      </label>
    </div>
  )
}