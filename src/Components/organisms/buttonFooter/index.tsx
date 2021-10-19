import React, { useContext } from 'react'
import styles from './buttonFooter.module.scss'
import GenericButton from '../../atoms/genericButton'
import { ControllersContext } from '../../../Contexts/ControllersContext'
import UpdateItemCartButton from '../../organisms/updateItemCartButton'
import { formatCurrency } from '../../../utils/formatData'
import Router from 'next/router'
import GenericTitle from '../../atoms/genericTitle'
import GenericText from '../../atoms/genericText'
import { format } from 'date-fns'


export default function ButtonFooter() {
  const controllersContext = useContext(ControllersContext)
  const { footerType } = controllersContext

  const selectFooter = () => {
    if (footerType === 'productDetail') {
      return <ProductDetail controllersContext={controllersContext} />
    }

    if (footerType === 'cartDetail') {
      return <CartDetail controllersContext={controllersContext} />
    }

    if (footerType === 'payment') {
      return <CartPayment controllersContext={controllersContext} />
    }
  }

  return selectFooter()
}

// FOOTER PRODUCT DETAIL
function ProductDetail({ controllersContext }) {
  const { addingCardItem, updateMyCart } = controllersContext

  const addToCart = () => {
    updateMyCart(addingCardItem)
    Router.push('/my-cart')
  }

  const currentPrice = () => {
    return addingCardItem.quantity * addingCardItem.price
  }

  return (
    <div className={styles.footerUpdateItem}>
      <UpdateItemCartButton
        price={currentPrice()}
        onClick={addToCart}
        text="Add to cart"
        disabled={addingCardItem.size ? false : true}
      />
    </div>
  )
}

// FOOTER MY CART DETAIL
function CartDetail({ controllersContext }) {
  const { myCartItems } = controllersContext
  const hasUser = localStorage.getItem('@noemia:user')

  const currentPrice = () => {
    var subTotal = 0

    myCartItems.forEach(({ quantity, price }) => {
      subTotal = quantity * price
    })

    return myCartItems.length > 0 ? subTotal + 5 : subTotal
  }

  const redirect = () => {
    if (hasUser) {
      Router.push('/my-cart/payment')
    } else {
      Router.push('/login')
    }
  }

  const disableButton = () => {
    if (!hasUser) {
      return true
    } else {
      if (myCartItems.length > 0) {
        return false
      } else true
    }
  }

  return (
    <div className={styles.footer}>
      <div className={styles.totalPrice}>
        <GenericText>Total</GenericText>
        <GenericTitle>{formatCurrency(currentPrice())}</GenericTitle>
      </div>
      <GenericButton
        disabled={disableButton ? false : true}
        text={hasUser ? "Payment" : "Do Login"}
        onClick={() => redirect()} />
    </div>
  )
}

// FOOTER CART PAYMENT
function CartPayment({ controllersContext }) {
  const { address, myCartItems, updateOrder } = controllersContext

  const disabled = () => {
    return address.street && myCartItems.length > 0 ? false : true
  }

  const date = format(new Date(), 'PP')

  const saveOrderStatus = () => {
    const newOrder = {
      myCartItems: myCartItems,
      dateOrder: date,
      orderStatus: 'confirmed',
      orderId: Math.floor(Math.random() * 100) + 1
    }

    updateOrder(newOrder)

    Router.push(`/my-cart/order-status/${newOrder.orderId}`)
  }

  return (
    <div className={styles.cartPayment}>
      <GenericButton disabled={disabled()} text="Place Order" onClick={() => saveOrderStatus()} />
    </div>
  )
}