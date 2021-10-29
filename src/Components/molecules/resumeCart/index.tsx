import React, { useContext, useEffect } from 'react';
import styles from './resumeCart.module.scss'
import GenericTitle from '../../atoms/genericTitle'
import GenericText from '../../atoms/genericText'
import { formatCurrency } from '../../../utils/formatData'
import { ControllersContext } from '../../../contexts/ControllersContext'
import { AuthContext } from '@contexts/AuthContext';
import { initializeApollo } from '@graphql/apollo'
import { GET_CART_BY_UID } from '@graphql/queries'

export default function ResumeCart() {
  const client = initializeApollo()
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)
  const { myCartItems, initializeMyCart } = controllersContext
  const { user, updateUser } = authContext


  useEffect(() => {
    const userStorage: any = JSON.parse(localStorage.getItem('@noemia:user'))

    async function fetchCartUser() {
      if (userStorage) {
        await client.query({
          query: GET_CART_BY_UID,
          variables: {
            uid: userStorage.uid,
          }
        }).then(({ data }) => {
          updateUser({ cart: data.users[0].cart })
          initializeMyCart(data.users[0].cart)
        })
      }
    }
    if (userStorage && !user.cart) {
      fetchCartUser()
    }
  }, [])

  const currentPrice = () => {
    var subTotal = 0
    if (user.cart) {
      user.cart.forEach(({ quantity, priceBySize }) => {
        subTotal = subTotal + (quantity * priceBySize)
      })
    } else {
      myCartItems.forEach(({ quantity, priceBySize }) => {
        subTotal = subTotal + (quantity * priceBySize)
      })
    }



    return subTotal
  }

  const itemPrice = (item) => {
    var subTotal = 0

    subTotal = item.quantity * item.priceBySize

    return subTotal
  }


  return user.cart || myCartItems.length > 0 ? (<div className={styles.resumeCart}>
    <GenericTitle>Your Resume</GenericTitle>
    {myCartItems.map(item => (
      <div key={item.id} className={styles.resumeItems}>
        <GenericText>{item.name}</GenericText>
        <GenericTitle>{formatCurrency(itemPrice(item))}</GenericTitle>
      </div>
    ))}
    <div className={styles.resumeItems}>
      <GenericText>Subtotal</GenericText>
      <GenericTitle>{formatCurrency(currentPrice())}</GenericTitle>
    </div>
    <div className={styles.resumeItems}>
      <GenericText>Delivery</GenericText>
      <GenericTitle>{formatCurrency(5)}</GenericTitle>
    </div>
    <div className={styles.strokeDashed} />
    <div className={styles.resumeItems}>
      <GenericText>Total</GenericText>
      <GenericTitle>{formatCurrency(currentPrice() + 5)}</GenericTitle>
    </div>
  </div>) : <div />
}