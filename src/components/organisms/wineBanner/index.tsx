import React from 'react'
import GenericText from '../../atoms/genericText'
import styles from './wineBanner.module.scss'
import Image from 'next/image'

export default function WineBanner() {

  return (
    <div className={styles.wine}>
      <div className={styles.wineWrapper}>
        <GenericText color="white">
          What is the better winne for your Pizza?
        </GenericText>
        <div className={styles.imageContainer}>
          <Image
            src={"/wine-background.png"}
            alt={'wine'}
            layout="fill"
            objectFit="cover"

          />
        </div>
      </div>
    </div>
  )
}
