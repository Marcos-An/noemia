import React from 'react'
import styles from './cardRecentOrder.module.scss'
import GenericText from '../../atoms/genericText'
import GenericDescription from '../../atoms/genericDescription'
import Image from 'next/image'

export default function CardRecentOrder() {

  return (
    <div className={styles.cardRecentOrder}>
      <div className={styles.imageContainer}>
        <Image
          src="/napoletana.jpg"
          alt="napoletana"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.infoContainer}>
        <GenericText weight="bold">Napoletana</GenericText>
        <div className={styles.priceHateWrapper}>
          <GenericText >$51,99</GenericText>
          <div className={styles.hateWrapper}>
            <GenericDescription>30-40 min</GenericDescription>
          </div>
        </div>
      </div>
    </div>
  )
}