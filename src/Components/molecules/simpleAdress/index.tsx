import React from 'react'
import GenericIcon from '../../atoms/genericIcon'
import GenericText from '../../atoms/genericText'
import styles from './simpleAdress.module.scss'

export default function SimpleAdress({ children }) {
  return (
    <div className={styles.wrapper}>
      <GenericText>{children} </GenericText>
      <GenericIcon icon="chevron-down" color="yellow" />
    </div>
  )
}
