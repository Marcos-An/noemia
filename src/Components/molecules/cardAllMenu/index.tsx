import React from 'react'
import styles from './cardAllMenu.module.scss'
import GenericText from '../../atoms/genericText'
import GenericIcon from '../../atoms/genericIcon'
import Image from 'next/image'
import GenericDescription from '../../atoms/genericDescription'
import Link from 'next/link'
import { formatCurrency } from '../../../utils/formatData'


export default function CardAllMenu() {
  const number = 1.3
  const product = {
    id: 1,
    name: 'Napoletana',
    pathImage: '/napoletana.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    type: 'pizza',
    price: 33.99
  }

  const { id, name, pathImage, description, type, price } = product


  return (
    <Link href={`/products/${type}?id:${id}`} passHref>
      <div className={styles.cardAllMenu}>
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
          <GenericDescription>{description}</GenericDescription>
          <div className={styles.priceHateWrapper}>
            <div className={styles.priceWrapper}>
              <GenericText>{formatCurrency(price)}</GenericText>
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