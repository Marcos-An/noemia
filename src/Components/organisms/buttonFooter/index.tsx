import React, { useContext } from 'react'
import styles from './buttonFooter.module.scss'
import GenericButton from '../../atoms/genericButton'
import { ControllersContext } from '../../../Contexts/ControllersContext'
import AddItemButton from '../../molecules/addItemButton'
import { formatCurrency } from '../../../utils/formatData'
import router, { useRouter } from 'next/router'


export default function ButtonFooter() {
  const controllersContext = useContext(ControllersContext)
  const router = useRouter()

  const selectFooter = () => {
    if (router.asPath.includes('products')) {
      return <DetailProduct controllersContext={controllersContext} />
    }
    if (router.asPath.includes('my-cart')) {
      return <CartDetail controllersContext={controllersContext} />
    }
  }

  return selectFooter()
}

// FOOTER PRODUCT DETAIL
function DetailProduct({ controllersContext }) {
  const { addingCardItem, updateMyCart } = controllersContext

  const currentPrice = () => {
    return addingCardItem.quantity * addingCardItem.price
  }

  const addToCart = () => {
    console.log('to aqui')
    updateMyCart(addingCardItem)
    router.push('/my-cart')
  }

  return (
    <div className={styles.footer}>
      <AddItemButton />
      <GenericButton
        disabled={addingCardItem.size ? false : true}
        text="Add to cart"
        price={formatCurrency(currentPrice())}
        onClick={addToCart}
      />
    </div>
  )
}

// FOOTER MY CART DETAIL
function CartDetail({ controllersContext }) {
  const { addingCardItem } = controllersContext

  const currentPrice = () => {
    return addingCardItem.quantity * addingCardItem.price
  }

  return (
    <div className={styles.footer}>
      <AddItemButton />
      <GenericButton disabled={addingCardItem.size ? false : true} text="Add to cart" price={formatCurrency(currentPrice())} />
    </div>
  )
}