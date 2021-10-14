import React from 'react'
import GenericIcon from '../../atoms/genericIcon'
import styles from './cartButton.module.scss'

export default function CartButton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.notification}>
        <span>3</span>
      </div>
      <GenericIcon icon="shopping-cart" size="16" />
    </div>
  )
}
