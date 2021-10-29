import React from 'react'
import styles from './cardSuggestions.module.scss'
import GenericText from '../../atoms/genericText'
import { formatCurrency } from '../../../utils/formatData'
import Image from 'next/image'
import GenericDescription from '../../atoms/genericDescription'
import Link from 'next/link'

export default function cardSuggestions() {
  const product = {
    id: 1,
    name: 'Napoletana',
    pathImage: '/napoletana.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    type: 'Pizza',
    price: 33.99
  }

  const { type, id, name, pathImage, price, description } = product

  return (
    <Link href={`/${type}/${id}`} passHref>
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
          <div className={styles.infoWrapper}>
            <GenericText weight="bold">{name}</GenericText>
            <GenericDescription>{description}</GenericDescription>
          </div>
          <div className={styles.priceHateWrapper}>
            <GenericText >{formatCurrency(price)}</GenericText>
            <GenericDescription>30-40 min</GenericDescription>
          </div>
        </div>
      </div>

    </Link>
  )
}