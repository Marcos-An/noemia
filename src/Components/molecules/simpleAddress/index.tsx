import React from 'react'
import GenericIcon from '../../atoms/genericIcon'
import GenericText from '../../atoms/genericText'
import styles from './simpleAddress.module.scss'

export default function SimpleAddress({ children }) {
  return (
    <div className={styles.wrapper}>
      <GenericText>{children} </GenericText>
      <GenericIcon icon="chevron-down" color="yellow" />
    </div>
  )
}
