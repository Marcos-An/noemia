import React from 'react'
import styles from './genericButton.module.scss'
import GenericText from '../genericText'

export default function GenericButton({ text, price = null, disabled = false, onClick = () => { } }) {

  return (
    <button className={styles[`genericButton${disabled ? 'Disabled' : ''}`]} onClick={() => onClick()} disabled={disabled}>
      <GenericText weight="bold">
        {text}
      </GenericText>
      {price && (
        <GenericText weight="bold">
          {price}
        </GenericText>
      )}
    </button>
  )
}