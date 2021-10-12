import React from 'react'
import GenericText from '../../atoms/genericText'
import styles from './wineBanner.module.scss'

export default function WineBanner() {

  return (
    <div className={styles.starter}>
      <div className={styles.starterWrapper}>
        <GenericText color="white">
          What is the better winne for your Pizza?
        </GenericText>
        <img src={"/wine-background.png"} />
      </div>
    </div>
  )
}