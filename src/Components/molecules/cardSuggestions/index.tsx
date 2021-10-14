import React from 'react'
import styles from './cardSuggestions.module.scss'
import GenericText from '../../atoms/genericText'
import GenericIcon from '../../atoms/genericIcon'
import Image from 'next/image'
import GenericDescription from '../../atoms/genericDescription'
import Link from 'next/link'

export default function cardSuggestions() {
  const number = 1.3

  const product = {
    id: 1,
    name: 'Napoletana',
    pathImage: '/napoletana.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    type: 'pizza',
    price: 33.99
  }

  const { type, id, name, pathImage, price } = product

  return (
    <Link href={`/products/${type}?id:${id}`} passHref>
      <div className={styles.cardSuggestions}>
        <div className={styles.imageContainer}>
          <Image
            src={pathImage}
            alt="napoletana"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.infoContainer}>
          <GenericText weight="bold">{name}</GenericText>
          <GenericDescription>30-40 min</GenericDescription>
          <br />
          <div className={styles.priceHateWrapper}>
            <GenericText >{price}</GenericText>
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