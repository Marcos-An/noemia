import React from 'react'
import styles from './cardAllMenu.module.scss'
import GenericText from '../../atoms/genericText'
import Image from 'next/image'
import GenericDescription from '../../atoms/genericDescription'
import Link from 'next/link'
import { formatCurrency } from '@utils/formatData'


export default function CardAllMenu({ product }) {

  const { id, name, path_image, description, category, price } = product


  return (
    <Link href={`/${category.name.toLowerCase()}/${id}`} passHref>
      <div className={styles.cardAllMenu}>
        <div className={styles.imageContainer}>
          <Image
            src={path_image}
            alt={name}
            layout="fill"
            objectFit="cover"

          />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.nameDescription}>
            <GenericText weight="bold">{name}</GenericText>
            <GenericDescription>{description}</GenericDescription>
          </div>
          <div className={styles.priceHateWrapper}>
            <div className={styles.priceWrapper}>
              <GenericText>{formatCurrency(price)}</GenericText>
              <GenericDescription>30-40 min</GenericDescription>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}