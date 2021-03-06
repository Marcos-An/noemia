import React, { useContext } from 'react'
import GenericIcon from '../../atoms/genericIcon'
import styles from './cartButton.module.scss'
import { useRouter } from 'next/router'
import { ControllersContext } from '../../../contexts/ControllersContext'

export default function CartButton() {
  const controllersContext = useContext(ControllersContext)
  const { cartItems } = controllersContext

  const router = useRouter()

  return (
    <div className={cartItems.length > 0 ? styles.wrapperActive : styles.wrapperDefault} onClick={() => { router.push('/my-cart') }}>
      {cartItems.length > 0 &&
        <div className={styles.notification}>
          <span>{cartItems.length}</span>
        </div>
      }
      <GenericIcon icon="shopping-cart" size="16" />
    </div>
  )
}
