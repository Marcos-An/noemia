import React from 'react'
import styles from './cardAllMenu.module.scss'
import GenericText from '../../atoms/genericText'
import GenericIcon from '../../atoms/genericIcon'
import Image from 'next/image'
import GenericDescription from '../../atoms/genericDescription'
import Link from 'next/link'
import { formatCurrency } from '../../../utils/formatData'


export default function CardAllMenu({ product }) {

  const { id, name, path_image, description, category, price, hate } = product


  return (
    <Link href={`/products/${category.name.toLowerCase()}?id:${id}`} passHref>
      <div className={styles.cardAllMenu}>
        <div className={styles.imageContainer}>
          <Image
            src={path_image}
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
              <GenericText>{hate.toFixed(1).replace('.', ',')}</GenericText>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}