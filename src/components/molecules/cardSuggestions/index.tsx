import React from 'react'
import styles from './cardSuggestions.module.scss'
import GenericText from '../../atoms/genericText'
import { formatCurrency } from '../../../utils/formatData'
import Image from 'next/image'
import GenericDescription from '../../atoms/genericDescription'
import Link from 'next/link'

export default function cardSuggestions({ product }) {

  const { id, name, path_image, price, description, category } = product

  return (
    <Link href={`/${category.name.toLowerCase()}/${id}`} passHref>
      <div className={styles.cardSuggestions}>
        <div className={styles.imageContainer}>
          <Image
            src={path_image}
            alt={name}
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