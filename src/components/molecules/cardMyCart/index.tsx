import React from 'react'
import styles from './cardMyCart.module.scss'
import GenericText from '../../atoms/genericText'
import { formatCurrency } from '../../../utils/formatData'
import Image from 'next/image'

export default function CardMyCart({ product, openDrawer }) {

  const { priceBySize, name, quantity, path_image } = product

  const currentPrice = () => {
    return quantity * priceBySize
  }

  return (
    <div className={styles.cardMyCart} onClick={openDrawer}>
      <div className={styles.infoContainer}>
        <GenericText weight="bold">{name}</GenericText>
        <div className={styles.priceHateWrapper}>
          <div className={styles.priceWrapper}>
            <GenericText>{formatCurrency(currentPrice())}</GenericText>
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={path_image}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.quantity}>
          <span>{quantity}</span>
        </div>
      </div>
    </div>
  )
}