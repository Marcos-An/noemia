import React from 'react'
import styles from './cardAllMenu.module.scss'
import GenericText from '../../atoms/genericText'
import GenericIcon from '../../atoms/genericIcon'
import Image from 'next/image'
import GenericDescription from '../../atoms/genericDescription'
import Link from 'next/link'

export default function CardAllMenu() {
  const number = 1.3

  return (
    <Link href="/products/napoletana">
      <div className={styles.cardAllMenu}>
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
          <GenericDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</GenericDescription>
          <div className={styles.priceHateWrapper}>
            <div className={styles.priceWrapper}>
              <GenericText>$51,99</GenericText>
              <GenericDescription>30-40 min</GenericDescription>
            </div>
            <div className={styles.hateWrapper}>
              <GenericIcon icon="star" size="12" />
              <GenericText>{number.toFixed(1).replace('.', ',')}</GenericText>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}