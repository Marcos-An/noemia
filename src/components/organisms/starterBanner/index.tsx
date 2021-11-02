import React from 'react'
import GenericText from '../../atoms/genericText'
import styles from './starter.module.scss'


export default function Starter() {

  return (
    <div className={styles.starter}>
      <div className={styles.starterWrapper}>
        <GenericText color="white">
          A good starter is a good start
        </GenericText>
      </div>
    </div>
  )
}