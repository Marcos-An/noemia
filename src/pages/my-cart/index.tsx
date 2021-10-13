import styles from './myCart.module.scss'
import React, { useEffect, useContext } from 'react'
import { ControllersContext } from '../../Contexts/ControllersContext'
import CardMyCart from '../../Components/molecules/cardMyCart'

export default function MyCart() {
  const controllersContext = useContext(ControllersContext)
  const { myCartItems, updateHeaderText } = controllersContext

  useEffect(() => {
    updateHeaderText('Your Cart')
  }, [])


  return (
    <div className={styles.container}>
      {myCartItems.map(item =>
        <CardMyCart key={item.name} product={item} />
      )
      }
    </div>
  )
}
