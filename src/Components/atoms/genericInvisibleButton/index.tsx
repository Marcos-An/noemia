import React from 'react'
import styles from './genericButton.module.scss'
import GenericText from '../genericText'

export default function GenericButton({ children, onClick = () => { } }) {

  return (
    <button className={styles.genericButton} onClick={() => onClick()}>
      <GenericText weight="bold">
        {children}
      </GenericText>
    </button>
  )
}