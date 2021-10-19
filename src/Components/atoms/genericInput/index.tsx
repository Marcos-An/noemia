import React from 'react';
import styles from './genericInput.module.scss'
import GenericText from '../genericText'


export default function GenericInput({ max = 9999, type = "text", label, value = '', setValue, id = "" }) {

  const changeValue = (e) => {
    const { target: { value } } = e

    setValue(value);
  }

  return (
    <div className={value ? styles.input : styles.inputEmpety}>
      <input
        id={id ? id : null}
        type={type}
        maxLength={max}
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