import React from 'react'
import styles from './cardRecentOrder.module.scss'
import GenericText from '../../atoms/genericText'
import GenericIcon from '../../atoms/genericIcon'
import Image from 'next/image'

export default function CardRecentOrder() {
  const number = 1.3

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
            <GenericIcon icon="star" size="12" />
            <GenericText>{number.toFixed(1).replace('.', ',')}</GenericText>
          </div>
        </div>
      </div>
    </div>
  )
}