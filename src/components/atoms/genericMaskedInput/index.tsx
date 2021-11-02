import React from 'react';
import styles from './genericMaskedInput.module.scss'
import GenericText from '../genericText'
import { useEffect } from 'react';
import { mask as Mask, unMask } from 'remask'

export default function GenericMaskedInput({ type = "text", label, value = '', setValue, mask = [''], id = "" }) {


  useEffect(() => {
    if (value) {
      const originalValue = unMask(value)
      const maskedValue = Mask(originalValue, mask)
      setValue(maskedValue);
    }
  }, [])

  const changeValue = (e) => {
    const { target: { value } } = e
    const originalValue = unMask(value)
    const maskedValue = Mask(originalValue, mask)
    setValue(maskedValue);
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