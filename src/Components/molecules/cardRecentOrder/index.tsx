import React from 'react'
import styles from './cardRecentOrder.module.scss'
import GenericText from '../../atoms/genericText'
import GenericDescription from '../../atoms/genericDescription'
import { formatCurrency } from '@utils/formatData'
import Link from 'next/link'
import Image from 'next/image'

export default function CardRecentOrder({ product }) {

  const { id, name, path_image, category, price } = product

  return (
    <Link href={`/${category.name.toLowerCase()}/${id}`} passHref>
      <div className={styles.cardRecentOrder}>
        <div className={styles.imageContainer}>
          <Image
            src={path_image}
            alt={name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.infoContainer}>
          <div>
            <GenericText weight="bold">{name}</GenericText>
          </div>

          <div className={styles.priceHateWrapper}>
            <GenericText >{formatCurrency(price)}</GenericText>
            <div className={styles.hateWrapper}>
              <GenericDescription>30-40 min</GenericDescription>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}