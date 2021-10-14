import React from 'react'
import styles from './cardMyCart.module.scss'
import GenericText from '../../atoms/genericText'
import { formatCurrency } from '../../../utils/formatData'
import Image from 'next/image'
import Link from 'next/link'

export default function CardMyCart({ product, onClick }) {

  const { price, name, quantity } = product

  const currentPrice = () => {
    return quantity * price
  }

  return (
    <div className={styles.cardMyCart} onClick={() => onClick()}>
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
          src="/napoletana.jpg"
          alt="napoletana"
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